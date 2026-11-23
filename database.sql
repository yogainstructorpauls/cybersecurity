BEGIN;

-- 🔐 Who owns a game (add in a later lesson if you want)
CREATE TABLE api_clients (
  id            SERIAL PRIMARY KEY,
  name          TEXT NOT NULL,
  api_key_hash  TEXT NOT NULL UNIQUE,          -- store the HASH, never the key itself
  created_at    TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE games (
  id          SERIAL PRIMARY KEY,
  client_id   INT REFERENCES api_clients(id) ON DELETE CASCADE,
  slug        TEXT NOT NULL UNIQUE CHECK (slug ~ '^[a-z0-9-]{2,32}$'),  -- "snake", "space-run"
  title       TEXT NOT NULL CHECK (length(title) BETWEEN 1 AND 64),
  max_score   INT  NOT NULL DEFAULT 9999999,   -- anti-cheat ceiling per game
  created_at  TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE players (
  id          SERIAL PRIMARY KEY,
  game_id     INT  NOT NULL REFERENCES games(id) ON DELETE CASCADE,
  username    TEXT NOT NULL CHECK (username ~ '^[A-Za-z0-9_-]{2,24}$'),
  created_at  TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE (game_id, username)                   -- same name allowed in different games
);

CREATE TABLE scores (
  id          BIGSERIAL PRIMARY KEY,           -- many rows over time
  player_id   INT NOT NULL REFERENCES players(id) ON DELETE CASCADE,
  score       INT NOT NULL CHECK (score >= 0),
  created_at  TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- ⚡ Leaderboard queries filter on player + sort by score
CREATE INDEX idx_scores_player_score ON scores (player_id, score DESC);
CREATE INDEX idx_scores_created_at   ON scores (created_at);

COMMIT;