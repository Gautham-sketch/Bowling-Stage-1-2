AFRAME.registerComponent("bowling-balls",{
    init: function(){
        this.throwBalls();
        this.removeBalls();
    },

    throwBalls: function(){
        window.addEventListener("keydown", (e)=>{
            if(e.key === 'r'){
                var ball = document.createElement("a-entity");
                ball.setAttribute("geometry",{
                    primitive : "sphere",
                    radius : 1,
                });
                ball.setAttribute("material","color","black");

                var cam = document.querySelector("#camera");
                pos = cam.getAttribute("position");
                bullet.setAttribute("position", {
                    x: pos.x,
                    y: pos.y,
                    z: pos.z,
                });

                var camera = document.querySelector("#camera");
                var direction = new Three.Vector3();
                camera.getWorldDirection(direction);

                ball.setAttribute("velocity",direction.multiplyScalar(-10));
                ball.setAttribute("dynamic-body",{
                    shape : "sphere",
                    mass : "0",
                });

                ball.addEventListener("collide", this.removeBalls)

                var scene = document.querySelector("#scene");
                scene.appendChild(bullet);
            }
        })
    },

    removeBalls : function(e){
        var element = e.detail.target.el;
        var element_hit = e.detail.body.el;

        if(element_hit.id.includes("pin")){
            var impulse = new CANNON.Vec3(0,-1,15);
            var worldPoint = new CANNON.Vec3().copy(
                element_hit.getAttribute("position")
            );
            element_hit.body.applyForce(impulse,worldPoint);
            element.removeEventListener("collide",this.removeBalls);
            var scene = document.querySelector('#scene');
            scene.removeChild(element);
        }
    },
})