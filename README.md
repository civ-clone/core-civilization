# core-civilization

The civilizations players lead, their leaders, and what each brings: `Civilization`, `Leader`, their `Attribute`s and
`Trait`s, and the city names each uses.

## Leader titles

A `LeaderTitle(leader, government)` rule answers what a leader is called under a government, and the `leaderTitle`
helper asks the rules for the first answer that isn't empty. With no `LeaderTitle` rules, or only empty answers, a
leader has no title.
