# Odd or Even Game Agreement

Agreement made _________ (date), between _____________________, known by signing key _____________________________ (public key), in this agreement referred to as PLAYER-1, and _______________, known by signing key ________________________ (public key), in this agreement referred to as PLAYER-2.

### 1) OBJECTIVE

In this game, PLAYER-1 picks a number between `1` and `32768` and PLAYER-2 between `1` and `32767`. Without knowning PLAYER-1's number, PLAYER-2 guesses whether the sum of their numbers will be odd or even. Both players reveal their numbers, and if PLAYER-2 guessed correctly, they win, otherwise PLAYER-1 wins.

### 2) GAME PLAY

WHEREAS ___________________ (game name) hearafter referred to as GINSTANCE is the name of a unique game of Odd or Even.

``` bash
GINSTANCE=''
```

WHEREAS PLAYER-1 and PLAYER-2 have deposited equal amounts of GG into the GAME-INSTANCE contract.

##### 2.1) PICK A NUMBER

PLAYER-1 picks a number between `1` and `32768`.

``` bash
num=$(($RANDOM + 1))
```

PLAYER-2 picks a number between `1` and `32767`.

``` bash
num="$RANDOM"
num=$(if [ "$num" = "0" ]; then echo 1; else echo $num; fi)
```


##### 2.2) SIGN YOUR NUMBER

Each player signs their number for this specific GINSTANCE, but does not show it to the other, yet.

``` bash
signum=$(printf "%s:%s" "$GINSTANCE" "$num" | gpg --clearsign)
```

##### 2.3) HASH YOUR SIGNED NUMBER

Each player hashes their signature of the number, and sends the hash to the other. This allows the other to have proof that their guess was already fixed.

``` bash
hashnum=$(echo $num | sha512sum | tr -d -)
```

##### 2.4) SIGN EACH OTHERS HASHES

By signing each other's hashes, both parties acknowledge that the other's number is locked in, and will yield the hash provided.

``` bash
sighash=$(echo $otherhash | gpg --clearsign)
```

##### 2.5) PLAYER-2 CHOSES

PLAYER-2 chooses whether they think the sum will be `odd` or `even`, signing the selection.

``` bash
choice='odd'
sigchoice=$(printf "%s:%s" "$GINSTANCE" "$choice" | gpg --clearsign)
```

PLAYER-2 then sends their signed choice to PLAYER-1.

##### 2.6 REVEAL

Finally, both parties reveal their numbers, and the two are summed to yield a TOTAL value between `2` and `65535`. There are `32767` chances of each, making the result an equal chance.

