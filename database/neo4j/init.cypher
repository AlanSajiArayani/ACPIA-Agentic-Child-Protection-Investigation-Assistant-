// Neo4j Cypher Constraints & Indexes for Synthetic Entity Correlation

// Uniqueness Constraints for Synthetic Entities
CREATE CONSTRAINT synthetic_account_id IF NOT EXISTS
FOR (a:SyntheticAccount) REQUIRE a.id IS UNIQUE;

CREATE CONSTRAINT synthetic_media_hash IF NOT EXISTS
FOR (m:SyntheticMedia) REQUIRE m.hash IS UNIQUE;

CREATE CONSTRAINT synthetic_identifier_val IF NOT EXISTS
FOR (i:SyntheticIdentifier) REQUIRE i.value IS UNIQUE;

// Indexes for Fast Multi-Hop Traversal
CREATE INDEX synthetic_account_pseudonym IF NOT EXISTS
FOR (a:SyntheticAccount) ON (a.pseudonym);

CREATE INDEX synthetic_platform_idx IF NOT EXISTS
FOR (a:SyntheticAccount) ON (a.platform);
