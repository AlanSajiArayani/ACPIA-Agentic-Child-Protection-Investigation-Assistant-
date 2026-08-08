# ACPIA Synthetic Evidence Dataset

> [!CAUTION]
> **STRICT SYNTHETIC DATA MANDATE**
> This directory contains **ONLY 100% fictional, synthetic test evidence**.
> No real people, real addresses, real phone numbers, real social-media accounts, real child-protection cases, or real sensitive materials are present.
> This dataset is constructed exclusively for safe hackathon demonstration, system correlation testing, and multi-agent workflow validation.

---

## Dataset Overview

The dataset simulates a fictional IT infrastructure access audit (`CASE-001`) with multi-modal evidence items that are intentionally cross-referenced across files.

### File Inventory
- **`case.json`**: Top-level case definition for `CASE-001`.
- **`people.json`**: 6 fictional entities (`Person_A` through `Person_F`).
- **`accounts.json`**: 7 synthetic platform accounts (`Account_001` through `Account_007`).
- **`locations.json`**: 6 fictional data centers/hubs (`Location_001` through `Location_006`).
- **`messages.json`**: 20 harmless communication logs containing cross-evidence clues (`EVID-MSG-001` through `EVID-MSG-020`).
- **`events.json`**: 12 synthetic operational events (`Event_001` through `Event_012`).
- **`documents/`**: 4 fictional log documents (`EVID-DOC-001` through `EVID-DOC-004`).

---

## Distributed Cross-Evidence Relationships

Relationships are intentionally distributed across separate files so that future ACPIA agents can demonstrate autonomous observation, entity extraction, timeline construction, and multi-hop correlation:

1. **Person to Account Ownership**:
   - `Person_A` owns `Account_001` (SyntheticMesh-Chat) and `Account_004` (FictionalCloud-Console).
   - `Person_B` owns `Account_002` (SyntheticMesh-Chat).
   - `Person_C` owns `Account_003` (SyntheticMesh-Chat).
   - `Person_D` owns `Account_005` (SyntheticMesh-Chat).
   - `Person_E` owns `Account_006` (FictionalCloud-Console).
   - `Person_F` owns `Account_007` (SyntheticMesh-Chat).

2. **Communication & Location Correlation**:
   - `EVID-MSG-001` (from `Account_001` to `Account_002`) references `Person_B` meeting at `Location_001` for `Event_001`.
   - `EVID-MSG-003` (from `Account_003` to `Account_001`) references `Person_C` transferring a config key to `Account_004`, pointing to document `EVID-DOC-001` at `Location_002`.

3. **Multi-Source Event Correlation**:
   - `Event_003` at `Location_003` is referenced by messages `EVID-MSG-005` and `EVID-MSG-006`, and documented in `EVID-DOC-003` (authored by `Person_D`).
   - `Event_006` at `Location_006` is referenced by messages `EVID-MSG-011` and `EVID-MSG-012`, and documented in `EVID-DOC-004` (co-authored by `Person_A` and `Person_D`).

4. **Timeline Consistency**:
   - All timestamps span March 1, 2026 to March 10, 2026 in strict chronological sequence.

---

## Agent Usage & Demonstration Purpose

Future ACPIA agents will ingest this dataset to:
1. **Extract Entities & Build Graph Edges**: Ingest `people.json` and `accounts.json` into Neo4j nodes.
2. **Correlate Multi-Modal Signals**: Match message clues (`messages.json`) against event records (`events.json`) and vector embeddings (`documents/`).
3. **Construct Chronological Timelines**: Build an investigation timeline connecting `Location_001` through `Location_006`.
4. **Identify Human Review Highlights**: Surface key overlapping connections for human investigator verification.
