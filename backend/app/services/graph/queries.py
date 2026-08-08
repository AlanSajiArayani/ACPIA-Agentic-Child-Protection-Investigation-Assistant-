"""
Centralized Cypher queries for ACPIA Neo4j Knowledge Graph.
All queries are parameterized to prevent Cypher injection.
"""

# Node creation / idempotent merge queries
MERGE_PERSON_NODE = """
MERGE (p:Person {id: $id})
SET p.display_name = $display_name
RETURN p
"""

MERGE_ACCOUNT_NODE = """
MERGE (a:Account {id: $id})
SET a.platform = $platform, a.handle = $handle
RETURN a
"""

MERGE_DEVICE_NODE = """
MERGE (d:Device {id: $id})
SET d.device_type = $device_type
RETURN d
"""

MERGE_LOCATION_NODE = """
MERGE (l:Location {id: $id})
SET l.name = $name, l.latitude = $latitude, l.longitude = $longitude
RETURN l
"""

MERGE_EVENT_NODE = """
MERGE (e:Event {id: $id})
SET e.timestamp = $timestamp, e.description = $description
RETURN e
"""

MERGE_EVIDENCE_NODE = """
MERGE (ev:Evidence {id: $id})
SET ev.evidence_type = $evidence_type, ev.title = $title
RETURN ev
"""

# Relationship creation / idempotent merge queries
MERGE_RELATION_PERSON_OWNS_ACCOUNT = """
MATCH (p:Person {id: $person_id})
MATCH (a:Account {id: $account_id})
MERGE (p)-[r:OWNS]->(a)
RETURN r
"""

MERGE_RELATION_PERSON_USES_DEVICE = """
MATCH (p:Person {id: $person_id})
MATCH (d:Device {id: $device_id})
MERGE (p)-[r:USES]->(d)
RETURN r
"""

MERGE_RELATION_ACCOUNT_COMMUNICATED = """
MATCH (a1:Account {id: $sender_id})
MATCH (a2:Account {id: $recipient_id})
MERGE (a1)-[r:COMMUNICATED_WITH {evidence_id: $evidence_id}]->(a2)
SET r.timestamp = $timestamp
RETURN r
"""

MERGE_RELATION_EVENT_OCCURRED_AT = """
MATCH (e:Event {id: $event_id})
MATCH (l:Location {id: $location_id})
MERGE (e)-[r:OCCURRED_AT]->(l)
RETURN r
"""

MERGE_RELATION_PERSON_INVOLVED_IN_EVENT = """
MATCH (p:Person {id: $person_id})
MATCH (e:Event {id: $event_id})
MERGE (p)-[r:INVOLVED_IN]->(e)
RETURN r
"""

MERGE_RELATION_EVIDENCE_REFERENCES_ENTITY = """
MATCH (ev:Evidence {id: $evidence_id})
MATCH (n {id: $entity_id})
MERGE (ev)-[r:REFERENCES]->(n)
RETURN r
"""

MERGE_RELATION_EVIDENCE_SUPPORTS_EVENT = """
MATCH (ev:Evidence {id: $evidence_id})
MATCH (e:Event {id: $event_id})
MERGE (ev)-[r:SUPPORTS]->(e)
RETURN r
"""

# Graph Retrieval & Analytical Queries
FIND_ENTITY_BY_ID = """
MATCH (n {id: $entity_id})
RETURN n.id AS id, labels(n) AS labels, properties(n) AS properties
"""

FIND_ENTITY_RELATIONSHIPS = """
MATCH (n {id: $entity_id})-[r]-(m)
RETURN 
    n.id AS source_id,
    type(r) AS relationship_type,
    properties(r) AS relationship_properties,
    m.id AS target_id,
    labels(m) AS target_labels,
    properties(m) AS target_properties
"""

FIND_SHORTEST_PATH = """
MATCH (a {id: $source_id}), (b {id: $target_id})
MATCH p = shortestPath((a)-[*..5]-(b))
RETURN 
    [node IN nodes(p) | {id: node.id, labels: labels(node), properties: properties(node)}] AS nodes,
    [rel IN relationships(p) | {type: type(rel), properties: properties(rel)}] AS relationships
"""

FIND_EVIDENCE_CONNECTED_TO_ENTITY = """
MATCH (ev:Evidence)-[r]-(n {id: $entity_id})
RETURN ev.id AS evidence_id, type(r) AS rel_type, properties(ev) AS evidence_properties
"""

FIND_ENTITIES_CONNECTED_THROUGH_ACCOUNT = """
MATCH (p1:Person)-[:OWNS]->(a1:Account)-[r:COMMUNICATED_WITH]-(a2:Account)<-[:OWNS]-(p2:Person)
RETURN p1.id AS person_1, a1.id AS account_1, type(r) AS rel_type, a2.id AS account_2, p2.id AS person_2
"""

FIND_EVENTS_FOR_ENTITY = """
MATCH (p:Person {id: $entity_id})-[:INVOLVED_IN]->(e:Event)
RETURN e.id AS event_id, e.timestamp AS timestamp, e.description AS description
"""

FIND_LOCATIONS_FOR_ENTITY = """
MATCH (p:Person {id: $entity_id})-[:INVOLVED_IN]->(e:Event)-[:OCCURRED_AT]->(l:Location)
RETURN DISTINCT l.id AS location_id, l.name AS location_name
"""

FIND_RELATIONSHIPS_BY_EVIDENCE = """
MATCH (a)-[r {evidence_id: $evidence_id}]->(b)
RETURN a.id AS source_id, type(r) AS rel_type, properties(r) AS rel_props, b.id AS target_id
"""
