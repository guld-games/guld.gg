# Lottery Game Agreement

Agreement made _________ (date), between _____________________, known by signing key _____________________________ (public key), in this agreement referred to as DEALER, and _______________, known by signing key ________________________ (public key), in this agreement referred to as PLAYER.

### 1) OBJECTIVE

The DEALER first establishes how much the PLAYER will wager, known as the BET. The DEALER then chooses a maximum number between `1` and `65535` known as the MAX. The DEALER must deposit BET multiplied by MAX to the contact.

The DEALER then picks a second number between `0` and MAX, known as the SECRET. Without knowning SECRET, PLAYER guesses a number between `0` and MAX. If PLAYER guessed correctly, they win their BET multiplied by MAX, otherwise the DEALER wins BET.

### 2) GAME PLAY

WHEREAS ___________________ (game name) hearafter referred to as GINSTANCE is the name of a unique game of Lottery.

``` bash
GINSTANCE=''
```

WHEREAS PLAYER has deposited ____________ (GG amount) hearafter referred to as BET to the GINSTANCE contract.

``` bash
BET=''
```

WHEREAS DEALER has chosen a maximum number of ____________ (natural number less than 65535) hearafter referred to as MAX.

``` bash
MAX=''
```

WHEREAS DEALER has deposited an amount of GG equal to BET multiplied by MAX to the GINSTANCE contract.

##### 2.1) DEALER PICKS SECRET

DEALER picks a number between `0` and MAX.

``` bash
SECRET=$( shuf -i 0-$MAX -n 1 )
```

##### 2.2) DEALER SIGNS SECRET

DEALER signs SECRET for this specific GINSTANCE, but does not show it to the other, yet.

``` bash
signum=$(printf "%s:%s" "$GINSTANCE" "$SECRET" | gpg --clearsign)
```

##### 2.3) DEALER HASHES SIGNED SECRET

DEALER hashes their signature of SECRET, and sends the hash to PLAYER. This allows PLAYER to have proof that SECRET was already fixed.

``` bash
hashnum=$(echo $signum | sha512sum | tr -d -)
```

##### 2.4) PLAYER SIGNS DEALER HASH

By signing the DEALER's SECRET hash, PLAYER acknowledges that SECRET is locked in and known only to DEALER.

``` bash
sighash=$(echo $hashnum | gpg --clearsign)
```

##### 2.5) PLAYER PICKS GUESS

PLAYER chooses what they think the SECRET is.

``` bash
GUESS=0
```

##### 2.6 PLAYER SIGNS GUESS

PLAYER signs the GUESS, sharing the signature with the DEALER.

``` bash
sigchoice=$(printf "%s:%s" "$GINSTANCE" "$GUESS" | gpg --clearsign)
```

##### 2.7 REVEAL

Finally, the DEALER reveals the secret. If the GUESS is equal to the SECRET, the PLAYER wins, otherwise the DEALER wins.

