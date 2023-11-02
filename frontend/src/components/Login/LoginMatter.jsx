// import { useEffect, useState } from "react";
// import Matter from "matter-js";

// const LoginMatter = () => {
//     const count = 10;
//     const [engine, setEngine] = useState(undefined);
//     const imgSrc = `./assets/images/stamp/clover.png`;

//     useEffect(() => {
//         const {
//           Engine,
//           Render,
//           Runner,
//           MouseConstraint,
//           Mouse,
//           Composite,
//         } = Matter;
    
//         // create engine
//         const newEngine = Engine.create();
//         setEngine(newEngine);
//         const world = newEngine.world;
//         const canvas = document.getElementById("matterCanvasCon");
//         const scrollHeight = Math.max(
//           document.body.scrollHeight, document.documentElement.scrollHeight,
//           document.body.offsetHeight, document.documentElement.offsetHeight,
//           document.body.clientHeight, document.documentElement.clientHeight
//         ) - 30;
    
//         // create renderer
//         const render = Render.create({
//           element: canvas,
//           engine: newEngine,
//           options: {
//             width: window.innerWidth,
//             height: scrollHeight,
//             wireframes: false,
//             background: "transparent",
//           },
//         });
    
//         Render.run(render);
    
//         // create runner
//         const runner = Runner.create();
//         Runner.run(runner, newEngine);
    
//         // add gyro control
//         if (typeof window !== "undefined") {
//           const updateGravity = (event) => {
//             const orientation =
//               typeof window.orientation !== "undefined"
//                 ? window.orientation
//                 : 0;
//             const gravity = newEngine.world.gravity;
    
//             if (
//               event.gamma !== null &&
//               event.beta !== null &&
//               event.beta !== null
//             ) {
//               if (orientation === 0) {
//                 gravity.x = Math.min(Math.max(event.gamma, -90), 90) / 50;
//                 gravity.y = Math.min(Math.max(event.beta, -90), 90) / 50;
//               } else if (orientation === 180) {
//                 gravity.x = Math.min(Math.max(event.gamma, -90), 90) / 50;
//                 gravity.y = Math.min(Math.max(-event.beta, -90), 90) / 50;
//               } else if (orientation === 90) {
//                 gravity.x = Math.min(Math.max(event.beta, -90), 90) / 50;
//                 gravity.y = Math.min(Math.max(-event.gamma, -90), 90) / 50;
//               } else if (orientation === -90) {
//                 gravity.x = Math.min(Math.max(-event.beta, -90), 90) / 50;
//                 gravity.y = Math.min(Math.max(event.gamma, -90), 90) / 50;
//               }
//             }
//           };
    
//           window.addEventListener("deviceorientation", updateGravity);
//         }
    
//         // add mouse control
//         const mouse = Mouse.create(render.canvas);
//         const mouseConstraint = MouseConstraint.create(newEngine, {
//           mouse: mouse,
//           constraint: {
//             stiffness: 0.2,
//             render: {
//               visible: false,
//             },
//           },
//         });
    
//         Composite.add(world, mouseConstraint);
//         Composite.add(world, Matter.Bodies.rectangle(window.innerWidth, -window.innerHeight/2-100, 1000, 100, { isStatic: true, render: {fillStyle: '#ff00000'} }));
//         Composite.add(world, Matter.Bodies.rectangle(window.innerWidth, window.innerHeight+180, 2000, 100, {isStatic: true, render: {fillStyle: '#ff00000'} }));
//         Composite.add(world, Matter.Bodies.rectangle(window.innerWidth*2+20, 300, 100, window.innerHeight*2, { isStatic: true, render: {fillStyle: '#ff00000'}  }));
//         Composite.add(world, Matter.Bodies.rectangle(0, 300, 100, window.innerHeight*2, { isStatic: true, render: {fillStyle: '#ff00000'}  }));
        
//         for (let i = 0; i < 80; i++) {
//             const x = 300 + Math.random() * 100;
//             const y = Math.random() * 700;
//             const circleRadius = 40;
            
//             // 1에서 8 사이의 랜덤 숫자 생성
//             const randomImageNumber = Math.floor(Math.random() * 8) + 1;

//             // 해당 숫자를 이미지 경로에 추가
//             const texturePath = `./assets/images/stamp/${randomImageNumber}.png`;
//             Composite.add(world, Matter.Bodies.circle(x, y, circleRadius, {
//                 render: {
//                     sprite: {
//                         texture: texturePath,
//                         xScale: (circleRadius * 2) / 40,
//                         yScale: (circleRadius * 2) / 40,
//                       },
//                 }
//             }));
//           }
//         // keep the mouse in sync with rendering
//         render.mouse = mouse;
    
//         // fit the render viewport to the scene
//         Render.lookAt(render, {
//           min: { x: 0, y: 0 },
//           max: { x: 800, y: 600 },
//         });
        
//         // Clean up the engine and renderer when component unmounts
//         return () => {
//           if (newEngine) {
//             Matter.Render.stop(render);
//             Matter.Runner.stop(runner);
//             Matter.Engine.clear(newEngine);
    
//             if(render.canvas){
//               render.canvas.remove();
//             }
//             if(render.canvas.parentNode){
//               render.canvas.parentNode.removeChild(render.canvas);
//             }
//           }
//         };
    
//     }, []);

//     const addCircle = () => {
//         if (engine) {
//           const { Bodies, Composite } = Matter;
//           const x = window.innerWidth/2 + Math.random() * (window.innerWidth);
//           const y = -(Math.random() * window.innerHeight)/10-100;
//           const circleRadius = 40;
//           const circle = Bodies.circle(x, y, circleRadius, {
//             render: {
//               sprite: {
//                 texture: imgSrc,
//                 xScale: (circleRadius * 2) / 50,
//                 yScale: (circleRadius * 2) / 50,
//               },
//             },
//           });
//           Composite.add(engine.world, circle);
//         }
//       };
      
//       useEffect(() => {
//         addCircle();
//       },[count]);
    
//     return null;
// };

// export default LoginMatter;