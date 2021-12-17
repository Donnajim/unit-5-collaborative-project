function PlayersName (first: string) {
    return first
}
controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
    projectile = sprites.createProjectileFromSprite(img`
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . 1 1 3 . . . . . . 
        . . . . . . 1 3 . 3 3 . . . . . 
        . . . . . . 1 . . . 3 2 2 3 . . 
        . . . . . 1 3 . . . 2 2 1 3 3 . 
        . . . . . 1 3 . 2 2 3 1 1 1 3 . 
        . . 2 2 2 1 3 3 3 3 3 1 1 1 3 . 
        . . 1 1 1 1 3 1 1 1 1 1 1 1 3 . 
        . . 2 2 2 1 3 3 3 3 3 1 1 1 3 . 
        . . . . . 1 3 . 2 2 3 1 1 1 3 . 
        . . . . . 1 3 . . . 2 2 1 3 3 . 
        . . . . . . 1 . . . 3 2 2 3 . . 
        . . . . . . 1 3 . 3 3 . . . . . 
        . . . . . . . 1 1 3 . . . . . . 
        . . . . . . . . . . . . . . . . 
        `, mySprite, 200, 0)
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.Projectile, function (sprite, otherSprite) {
    sprite.destroy(effects.spray, 500)
    info.changeScoreBy(-1)
})
sprites.onOverlap(SpriteKind.Projectile, SpriteKind.Enemy, function (sprite, otherSprite) {
    otherSprite.destroy()
    otherSprite.destroy(effects.blizzard, 500)
    info.changeScoreBy(1)
})
let opponent: Sprite = null
let projectile: Sprite = null
let mySprite2: Sprite = null
let mySprite: Sprite = null
let User = game.askForString("ready to start game? Yes(y) No(n)", 1)
if (!(User == "n")) {
    User = game.askForString(PlayersName("what is the player's name?"))
    tiles.loadMap(tiles.createMap(tilemap`level1`))
    mySprite = sprites.create(img`
        . . . . . . f f f f . . . . . . 
        . . . . f f f 2 2 f f f . . . . 
        . . . f f f 2 2 2 2 f f f . . . 
        . . f f f e e e e e e f f f . . 
        . . f f e 2 2 2 2 2 2 e e f . . 
        . . f e 2 f f f f f f 2 e f . . 
        . . f f f f e e e e f f f f . . 
        . f f e f b f 4 4 f b f e f f . 
        . f e e 4 1 f d d f 1 4 e e f . 
        . . f e e d d d d d d e e f . . 
        . . . f e e 4 4 4 4 e e f . . . 
        . . e 4 f 2 2 2 2 2 2 f 4 e . . 
        . . 4 d f 2 2 2 2 2 2 f d 4 . . 
        . . 4 4 f 4 4 5 5 4 4 f 4 4 . . 
        . . . . . f f f f f f . . . . . 
        . . . . . f f . . f f . . . . . 
        `, SpriteKind.Player)
    game.splash(User, " your task is to defeat your opponent ")
    controller.moveSprite(mySprite, 200, 200)
    mySprite.setStayInScreen(true)
    info.setScore(0)
    info.setLife(3)
} else {
    while (true) {
        mySprite2 = sprites.create(img`
            ...........................cccccccccc..........................
            .........................ccc11111111ccc........................
            ........................cc111111111111cc.......................
            .......................cc11111111111111cc......................
            ......................cc1111111111111111cc.....................
            ......................c111111111111111111c.....................
            .....................cc111111111111111111cc....................
            .....................cc1111111111111111111c....................
            .....................c11111111111111111111c....................
            ....................cc11111111111111111111cc...................
            ....................cc11111111111111111111cc...................
            ....................cc111111111111111111111c...................
            ....................cc111111111111111111111c...................
            ....................cc111111111111111111111c...................
            ....................cc111111111111bcccc1111c...................
            ....................cc11111111111111ccc1111c...................
            .....................c11bcccc1111111cc11111c...................
            .....................cb111ccc1111111111111cc...................
            .....................cb111cc11111111111111cc...................
            .....................cb1111111111111b111ccccc..................
            ....................ccbb111111111111b11cc111cc.................
            ..................ccc11bb11111b1111b111c11111cc................
            ................cccdd111bb11111bbbb111b1111111ccccc............
            ...............cc111d1111bbb11111111bb1111bb111cc1cc...........
            ..............cc1111dd11111bbbbbbbbbbb1111bb111b111cc..........
            ..............c111111d11111111d11111bbb111bb11bb1111cc.........
            .............cc111111d11111111dd1111bb1b111b11b111111c.........
            ............cc111114441111111111ddddb11bbbb111b111111c.........
            ...........cc11111145411111111111111b11111111bb111111cc........
            ..........cc111111145411111111111111bb1111111bb1111111c........
            .........ccdd111111454111111111111111bb1111111bb111111cc.......
            ........cc111d1111145441111111111111111b1111111bb111111c.......
            .......cc11111d111d45541111111111111111bb1111111bb11111c.......
            .......c111111dd1ddd45411111111111111111bb1111111bbddd1cc......
            ......cc1111bbbbbddd454111111111111111111bb11111111bddd1c......
            ......cc11bbb111bbbd4541111111111111111111bb11111111111dcc.....
            ......cc11bb111bbbbc4541111111111111111111dbc11111111111cc.....
            ......cc11b111bb111bc5411111111111111111111dcc11111111111c.....
            bbbbbbcc111111b11111bc4cc111111111111111111ddcc1111111111c.....
            dddddddcc1111b111111bb11ccbbbbbbbb111111111dddcc11111111cc.....
            ddddddddcc111b1111111bb11cdddddddbbbbbbbbbbbbbccc111111cc......
            ddddddddddcccb11111111bbccbbddddddddddddddddddddccc111ccbbbbbbb
            ddddddddddddccc11111111bc111bbbddddddddddddddddddccccccdddddddd
            dddddddddddddccc1111111cc111111bbbddddddddddddddddddddddddddddd
            ddddddddddddbb11cc1111cc111111111bddddddddddddddddddddddddddddd
            ddddddddddbb11111cccccc111111111bdddddddddddddddddddddddddddddd
            ddddddddddb11111111111111111111bddddddddddddddddddddddddddddddd
            ddddddddddbb111111111111111111bdddddddddddddddddddddddddddddddd
            ddddddddddddbb111111111111111bddddddddddddddddddddddddddddddddd
            ddddddddddddddbb111111111111bdddddddddddddddddddddddddddddddddd
            ddddddddddddddddbb111111111bddddddddddddddddddddddddddddddddddd
            ddddddddddddddddddbb111111bdddddddddddddddddddddddddddddddddddd
            ddddddddddddddddddddbb111bddddddddddddddddddddddddddddddddddddd
            ddddddddddddddddddddddbbbdddddddddddddddddddddddddddddddddddddd
            ddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd
            `, SpriteKind.Player)
        mySprite2.sayText("Come back to play another time")
        music.playMelody("F D F D G E F D ", 120)
    }
}
game.onUpdateInterval(500, function () {
    opponent = sprites.createProjectileFromSide(img`
        . . . . c c c c c . . . . . . . 
        . . c c 5 5 5 5 5 c . . . . . . 
        . c 5 5 5 5 1 f 5 5 c . . . . . 
        c 5 5 5 5 5 f f 5 5 5 c . . . . 
        c 5 5 5 5 5 5 5 5 5 5 5 c . . . 
        c c b b 1 b 5 5 5 5 5 5 c . . . 
        c 5 3 3 3 5 5 5 5 5 5 5 d c . . 
        c 5 3 3 3 5 5 5 5 5 d d d c . . 
        . c 5 5 5 5 b 5 5 5 d d d c . . 
        . . c b b c 5 5 b d d d d c . . 
        . c b b c 5 5 b b d d d d c c c 
        . c c c c c c d d d d d d d d c 
        . . . . c c c b 5 5 b d d d c . 
        . . . . . c d 5 5 b b c c c . . 
        . . . . c c c c c c c . . . . . 
        . . . . c b b b c . . . . . . . 
        `, 50, 50)
    opponent.setVelocity(-100, 0)
    opponent.setPosition(160, randint(0, 120))
})
