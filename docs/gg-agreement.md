# Guld Games Agreement

Agreement made _________ (date), by ______________________ (name) known as MEMBER using signing key _____________________________ (key fingerprint) to join the gg group hearafter referred to as GROUP.

```
GROUP = gg
FINGERPRINT =
MEMBER =
```

### Governance

The GROUP will be governed in a Proof of Stake model. Members of gg group can stake GG to their `gg:Equity` sub-account. Each GG staked in this manner equals 1 vote on the contents of the gg branch.

```
# TODO vote counting function
```

Changes to this document, or other game contracts requires at minimum 51% of `gg:Equity` approval.

### Economics

##### Future Price Database

 + Blocktree path: /gg/ledger/prices/gg.db
 + [Public mirror](https://github.com/guld-games/token-prices/blob/master/gg.db)

The official rate for GULD to GG, known hereafter as BURNRATE, is published in the blocktree at `/gg/ledger/prices/gg.db`. These prices require `75%` approval of `gg:Equity` to change.

BURNRATE starts at 7100 GG per GULD burned. The appreciation schedule is set for the next 40 years, after which it plateaus at 1:1.

### Transactions Templates

All templates assume the following conditions.

WHEREAS DATE & TIME are the UTC date and timestamp at signing time.

WHEREAS GAME is a known game rule set i.e. TEXAS HOLD'EM.

WHEREAS GAME-INSTANCE is an officially tracked instance of GAME.

##### Burn

WHEREAS MEMBER is a member in good standing of the `guld` group.

MEMBER may burn GULD and receive a credit for future guld games.

WHEREAS AMOUNT is a positive number of GULD.

``` ledger
DATE * register group
    ; timestamp: TIME
    MEMBER:Assets   -AMOUNT GULD
    MEMBER:Expenses:guld:register   AMOUNT GULD
    guld:Liabilities   AMOUNT GULD
    guld:Income:register:group:gg:MEMBER   -AMOUNT GULD
```

##### Claim Burn

Once MEMBER has burned GULD for the `gg` group, anyone may create the corresponding `GG` issuance, and transfer into MEMBER's `MEMBER:Assets` account.

Any burned GULD available in the `guld:Income:register:group:gg:MEMBER` account to GAME-INSTANCE must be converted at the BURNRATE at TIME.

WHEREAS AMOUNT is a positive number of GULD.

WHEREAS GGAMOUNT is equal to AMOUNT * BURNRATE.

``` ledger
DATE * claim burn
    ; timestamp: TIME
    guld:Income:register:group:gg:MEMBER    AMOUNT GULD
    guld:Income:register:group:gg    -AMOUNT GULD
    MEMBER:Assets   GGAMOUNT GG
    gg:Liabilities    -GGAMOUNT GG
```

##### Funding

WHEREAS GAME is a known game rule set i.e. TEXAS HOLD'EM.

WHEREAS GAME-INSTANCE is an officially tracked instance of GAME.

WHEREAS AMOUNT is a positive number of GG.

``` ledger
DATE * GG funding
    ; timestamp: TIME
    MEMBER:Assets    -AMOUNT GG
    gg:Games:GAME:GAME-INSTANCE    AMOUNT GG
```

##### Transfer

The MEMBER is allowed to send GG from their own `MEMBER:Assets` account to any other `gg:Assets` account known as OTHER for this clause.

WHEREAS AMOUNT is a positive number of GG, and MEMBER has at least AMOUNT in `MEMBER:Assets`.

``` ledger
DATE * GG transfer
    ; timestamp: TIME
    MEMBER:Assets   -AMOUNT GG
    OTHER:Assets    AMOUNT GG
```

##### Claim Win (Optional Stake)

The MEMBER is allowed to send GG from any game winning contract into their Assets and/or staking account.

WHEREAS MEMBER was a winner of GAME-INSTANCE.

WHEREAS STAKE_AMOUNT is less than or equal to the minimum bet for GAME-INSTANCE.

WHEREAS AMOUNT is the total winnings minus STAKE_AMOUNT

``` ledger
DATE * GG claim win
    ; timestamp: TIME
    gg:Games:GAME:GAME-INSTANCE    -AMOUNT GG
    MEMBER:Assets    -AMOUNT GG
    gg:Games:GAME:GAME-INSTANCE    -STAKE_AMOUNT GG
    gg:Equity:MEMBER    -STAKE_AMOUNT GG
```

##### Unstake

The MEMBER is allowed to unstake at any time, into a qualifying game contract.

WHEREAS DATE & TIME are the UTC date and timestamp at signing time.

WHEREAS GAME is a known game rule set i.e. TEXAS HOLD'EM.

WHEREAS GAME-INSTANCE is an officially tracked instance of GAME.

WHEREAS AMOUNT is less than or equal to the balance of `gg:Equity:MEMBER`.

``` ledger
DATE * GG unstake
    ; timestamp: TIME
    gg:Equity:MEMBER    -AMOUNT GG
    gg:Games:GAME:GAME-INSTANCE    AMOUNT GG
```

The MEMBER is also allowed to unstake at any time, directly into their Assets account.

``` ledger
DATE * GG unstake
    ; timestamp: TIME
    gg:Equity:MEMBER    -AMOUNT GG
    MEMBER:Assets    AMOUNT GG
```
