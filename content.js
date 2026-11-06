(() => {
  'use strict';
  const worlds = [
    {name:'Digital Detective',title:'Signals from the stars',place:'Aurora Station',desc:'Passwords, clues, and safe choices.',icon:'🔭'},
    {name:'Cipher Comets',title:'The code comet trail',place:'Comet Observatory',desc:'Patterns, letter shifts, and secret signals.',icon:'☄️'},
    {name:'Message Moon',title:'The message moon',place:'Luna Relay',desc:'Spot pressure tricks and protect private details.',icon:'📡'},
    {name:'Robot Ring',title:'Bots of the asteroid ring',place:'Asteroid Workshop',desc:'Plan clear steps and debug robot routes.',icon:'🤖'},
    {name:'Network Nebula',title:'Paths through the nebula',place:'Nebula Hub',desc:'Build safe routes and understand connections.',icon:'🌐'},
    {name:'Privacy Planet',title:'The privacy planet',place:'Verdant Base',desc:'Choose what to share and what to keep private.',icon:'🪴'},
    {name:'Data Garden',title:'The data garden',place:'Crystal Greenhouse',desc:'Sort information, notice patterns, and think carefully.',icon:'💎'},
    {name:'Cloud Harbor',title:'Harbor in the clouds',place:'Cloudport',desc:'Check links, messages, and account safety.',icon:'☁️'},
    {name:'Firewall Frontier',title:'The firewall frontier',place:'Frontier Outpost',desc:'Practice smart security habits in new situations.',icon:'🛡️'},
    {name:'Starship Academy',title:'The final flight academy',place:'Starship Academy',desc:'Bring every junior-agent skill together.',icon:'🚀'}
  ];
  const first = [
    {title:'A secret for the starship',category:'PASSWORD DETECTIVE',icon:'🔐',tip:'Long passwords are like long space journeys: harder for a guesser to finish!',instructions:'The Starship Aurora needs a new password. Which one would be hardest for a stranger to guess?',type:'choice',options:['starship','Nova2026!','Purple-Comet-47!'],answer:2,hint:'Choose the longest option that mixes different kinds of characters. Avoid using just one familiar word.'},
    {title:'The message in the stars',category:'CODE CRACKER',icon:'🛰️',tip:'A cipher changes letters in a pattern. Look for a tiny rule you can repeat.',instructions:'A friendly explorer shifted every letter forward by one. Shift each letter back by one to read the secret word.',type:'cipher',code:'DPNFU',shift:1,answer:'COMET',hint:'If a letter is D, move one step back in the alphabet. D becomes C. Try the same move for every letter.'},
    {title:'A suspicious signal',category:'SPOT THE SCAM',icon:'📡',tip:'Pause before clicking. Real helpers will not rush you or ask for secret passwords.',instructions:'A message pops up on the space station. Which clue shows it may be a trick?',type:'choice',message:'URGENT! Your space prize expires in 5 minutes. Click this strange link and enter your password NOW!',options:['It says hello politely.','It rushes you and asks for your password through a strange link.','It mentions a space prize.'],answer:1,hint:'Look for pressure to act fast, an unfamiliar link, and a request for a password. Those are warning signs.'},
    {title:'Robot rescue route',category:'ROBOT PROGRAMMER',icon:'🤖',tip:'A computer follows each instruction in order. Small steps can make a big difference.',instructions:'Help Bot-7 reach the green beacon. Put the moves in the right order: move right twice, then move up once.',type:'sequence',sequencePrompt:'Bot-7 starts at the bottom-left. Route: 2 steps right, then 1 step up.',commands:['↑ MOVE UP','→ MOVE RIGHT','→ MOVE RIGHT'],answer:['→ MOVE RIGHT','→ MOVE RIGHT','↑ MOVE UP'],hint:'The robot begins on the left. It must travel right across the floor before climbing one step to the beacon.'},
    {title:'Link the star network',category:'NETWORK NAVIGATOR',icon:'🌐',tip:'Networks work when devices have a safe path to share information.',instructions:'Connect the green base to the purple satellite by tapping a path through the network. Avoid the red warning node.',type:'network',nodes:[['A',12,52],['B',36,25],['C',36,77],['D',62,25],['E',62,77],['F',88,52]],edges:[['A','B'],['A','C'],['B','D'],['B','E'],['C','D'],['C','E'],['D','F'],['E','F']],blocked:'D',answer:['A','C','E','F'],hint:'A safe route is A → C → E → F. Tap one connected node at a time, and skip the red warning node.'}
  ];
  const wordBank = ['COMET','ORBIT','NOVA','LASER','ROVER','SPACE','MOON','STAR','SOLAR','RADAR','VENUS','MARS','PLUTO','CRATER','ROCKET','GALAXY','METEOR','PLANET','ASTRO','NEBULA','COSMOS','LUNAR','SATURN','JUPITER','AURORA','ECLIPSE','MODULE','BEACON','SIGNAL','OXYGEN','PILOT','SHUTTLE','ENGINE','CAPTAIN','DOCKING','LAUNCH','STATION','SATELLITE','TELESCOPE','ASTRONAUT','MISSION','CIRCUIT','ROBOT','PIXEL','VECTOR','CODING','PUZZLE','LOGIC','DEVICE','NETWORK'];
  const labels = [
    ['PASSWORD DETECTIVE','CODE CRACKER','SPOT THE SCAM','ROBOT PROGRAMMER','NETWORK NAVIGATOR'],
    [['A stronger secret','The captain’s key','A password pattern','Lock the airlock','Choose a passphrase'],['A shifted signal','Letters in orbit','Decode the beacon','Comet cipher','The hidden word'],['A too-good message','A rushed request','Check before clicking','The prize alert','A strange sender'],['Guide Bot-7','A careful command','Robot route plan','Sequence rescue','Beacon directions'],['Find a safe path','Connect the relay','Route the signal','Choose the link','Map the network']]
  ];
  const icons = ['🔐','🛰️','📡','🤖','🌐'];
  const tips = [
    'Use a made-up example only. Real passwords should be private and hard to guess.',
    'Move each letter the same number of steps. Wrap from A back around to Z.',
    'Pause when a message creates pressure or asks for private information.',
    'A robot follows the steps in order. Check each move before it starts.',
    'Trace a connected path from the green start to the purple destination.'
  ];
  const passwordWords = [['Luna','Comet','River','Tiger','Maple','Nova','Cloud','Cedar','Pixel','Coral'],['Beacon','Harbor','Planet','Rocket','Garden','Silver','Orbit','Meadow','Velvet','Jungle']];
  const scamParts = [
    ['A stranger says: “You won a free starship! Send your account password to claim it.”','It asks for a password to claim an unexpected prize.','It uses an exclamation mark.'],
    ['A message says: “Your account closes in 2 minutes. Tap this unknown link and sign in now!”','It pressures you to act fast and uses an unknown sign-in link.','It tells you there is an account.'],
    ['A new online friend says: “Keep our chat secret. Tell me your home address so I can send a gift.”','It asks for private information and tells you to keep it secret.','It offers to send a gift.'],
    ['A pop-up says: “Install this mystery helper to make your game score double instantly!”','It promises an unbelievable reward and asks you to install something unknown.','It mentions a game score.'],
    ['An email says: “I am your teacher. Reply with your sign-in code so I can fix your account.”','It asks you to share a sign-in code. A trusted adult or helper should never need you to send that code.','It uses a familiar role in the message.']
  ];
  const moveSets = [
    ['→ MOVE RIGHT','↑ MOVE UP','→ MOVE RIGHT'],
    ['↑ MOVE UP','→ MOVE RIGHT','↓ MOVE DOWN','→ MOVE RIGHT'],
    ['→ MOVE RIGHT','→ MOVE RIGHT','↑ MOVE UP','→ MOVE RIGHT'],
    ['↑ MOVE UP','↑ MOVE UP','→ MOVE RIGHT','↓ MOVE DOWN','→ MOVE RIGHT'],
    ['→ MOVE RIGHT','↑ MOVE UP','→ MOVE RIGHT','↓ MOVE DOWN','→ MOVE RIGHT']
  ];
  const layouts = [
    {route:['A','B','E','F'],blocked:'D',edges:[['A','B'],['B','E'],['E','F'],['A','C'],['C','D'],['D','F']]},
    {route:['A','C','D','F'],blocked:'E',edges:[['A','C'],['C','D'],['D','F'],['A','B'],['B','E'],['E','F']]},
    {route:['A','B','D','F'],blocked:'E',edges:[['A','B'],['B','D'],['D','F'],['A','C'],['C','E'],['E','F']]},
    {route:['A','C','E','F'],blocked:'D',edges:[['A','C'],['C','E'],['E','F'],['A','B'],['B','D'],['D','F']]},
    {route:['A','B','E','F'],blocked:'C',edges:[['A','B'],['B','E'],['E','F'],['A','C'],['C','D'],['D','F']]}
  ];
  function rotate(word, amount) { return [...word].map(ch => String.fromCharCode(65 + (ch.charCodeAt(0)-65+amount+26)%26)).join(''); }
  function shuffledOptions(options, answer, seed) { const offset=seed%3, moved=options.map((_,i)=>options[(i+offset)%3]), movedAnswer=(answer-offset+3)%3; return {options:moved,answer:movedAnswer}; }
  function buildLevel(worldIndex, localIndex) {
    const type=(localIndex-1)%5, round=Math.floor((localIndex-1)/5), world=worlds[worldIndex], level=worldIndex*25+localIndex;
    const title=`${world.name} · ${labels[1][round][type]}`;
    const base={level,world:worldIndex,title,category:labels[0][type],icon:icons[type],tip:tips[type]};
    if(type===0){
      const adjective=passwordWords[worldIndex%2][(round*2+worldIndex)%10], object=passwordWords[1][(round*3+worldIndex+4)%10];
      const extra=passwordWords[0][(round*3+worldIndex+6)%10],phrase=worldIndex<3?`${adjective}-${object}`:worldIndex<6?`${adjective}-${object}-${extra}`:`${adjective}-${extra}-${object}`;
      const right=`${phrase}-${String(31+worldIndex*7+round*11)}!`, weak1=`${object.toLowerCase()}${2020+worldIndex}`, weak2=`${adjective.toLowerCase()}123`;
      const pack=shuffledOptions([weak1,right,weak2],1,worldIndex+round);
      return {...base,type:'choice',instructions:`A made-up example password is being tested at ${world.place}. Which choice would be hardest for a stranger to guess? Never use these examples as a real password.`,options:pack.options,answer:pack.answer,hint:'Look for a longer mix of words, numbers, and symbols. A single familiar word plus simple numbers is easier to guess.'};
    }
    if(type===1){
      const answer=wordBank[(worldIndex*5+round*7)%wordBank.length],shift=Math.min(9,1+worldIndex+round%3);
      return {...base,type:'cipher',shift,code:rotate(answer,shift),answer,instructions:`A friendly explorer shifted every letter forward by ${shift}. Move each letter back by ${shift} to decode the signal.`,hint:`Move the first letter ${shift} ${shift===1?'step':'steps'} back in the alphabet, then do the same for every letter. If you pass A, wrap around to Z.`};
    }
    if(type===2){
      const [message,correct,other]=scamParts[round],pack=shuffledOptions([other,correct,`It mentions ${world.place}.`],1,worldIndex+round);
      return {...base,type:'choice',message,instructions:`At ${world.place}, an incoming message appears. Which detail is a warning sign?`,options:pack.options,answer:pack.answer,hint:'Look for requests for passwords or private details, pressure to act quickly, strange links, secrecy, or rewards that sound too good to be true.'};
    }
    if(type===3){
      const answer=[...moveSets[round]];for(let n=0;n<Math.floor(worldIndex/3);n++)answer.push(['← MOVE LEFT','↓ MOVE DOWN','↑ MOVE UP'][(worldIndex+n)%3]);
      const commands=[...answer.slice(round%answer.length),...answer.slice(0,round%answer.length)].reverse();
      const moves=answer.map(c=>c.startsWith('→')?'right':c.startsWith('←')?'left':c.startsWith('↑')?'up':'down');
      const groups=[];for(const dir of moves){const last=groups.at(-1);if(last&&last.dir===dir)last.count++;else groups.push({dir,count:1});}
      const target=groups.map(({dir,count})=>`${count} step${count===1?'':'s'} ${dir}`).join(', then ');
      return {...base,type:'sequence',commands,answer,sequencePrompt:`Bot-7 starts at the floor marker. Put the moves in the order that follows the route clue: ${target}.`,instructions:`Help Bot-7 travel safely through ${world.place}. Arrange its moves to follow the route clue.`,hint:'Read the route clue from start to finish. The robot must do each group of moves in that same order.'};
    }
    const layout=layouts[(worldIndex+round)%layouts.length];
    return {...base,type:'network',instructions:`Connect the green base to the purple satellite near ${world.place}. Tap a connected route and avoid the red warning node.`,nodes:[['A',12,52],['B',35,25],['C',35,79],['D',64,25],['E',64,79],['F',88,52]],edges:layout.edges,blocked:layout.blocked,answer:layout.route,hint:`Start at A and follow a connected path to F. The red ${layout.blocked} node is unsafe; choose the other branch.`};
  }
  const levels=[...first.map((item,i)=>({...item,level:i+1,world:0}))];
  for(let w=0;w<worlds.length;w++) for(let n=1;n<=25;n++) {
    const absolute=w*25+n;
    if(absolute<=5) continue;
    levels.push(buildLevel(w,n));
  }
  window.CYBER_QUEST_WORLDS=worlds;
  window.CYBER_QUEST_LEVELS=levels;
})();
