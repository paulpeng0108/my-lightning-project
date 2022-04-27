import { Lightning, Router, Utils } from "@lightningjs/sdk";

export class NotFound extends Lightning.Component {
    static _template(){
        return {
            Background: {
                w: 1920,
                h: 1080,
                color: 0xfffbb03b,
                src: Utils.asset('images/background.png'),
            },
            Logo: {
                mountX: 0.5,
                mountY: 1,
                x: 960,
                y: 600,
                src: Utils.asset('images/logo.png'),
            },
            Text: {
                mount: 0.5,
                x: 960,
                y: 720,
                text: {
                    text: "Page not found",
                    fontFace: 'Regular',
                    fontSize: 64,
                    textColor: 0xbbffffff,
                },
            },
        }
    }
    
    _handleEnter(){
        Router.navigate("home")
    }
}