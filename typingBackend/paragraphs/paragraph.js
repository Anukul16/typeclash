
const paragraphs = [
    "On the outskirts of town, nestled between rolling hills and lush greenery, lies a quaint village with a population of 500 residents. Each morning, the villagers gather in the town square to start their day, exchanging pleasantries and catching up on the latest news. Children play in the streets, their laughter echoing through the narrow cobblestone alleys. The local market bustles with activity as vendors sell fresh produce and handmade goods. Life in the village moves at a leisurely pace, far removed from the hustle and bustle of city life.",

    "In the heart of the forest, a majestic waterfall cascades down a rocky cliff, its waters plunging 100 feet into a crystal-clear pool below. Surrounding the waterfall are towering trees, some reaching heights of 150 feet or more. The air is filled with the sound of rushing water and the sweet melody of birdsong. Hikers and nature enthusiasts flock to the area, drawn by its natural beauty and tranquility. A well-worn trail leads visitors through the dense foliage, offering breathtaking views at every turn.",


    "High atop a snow-capped mountain peak, an expedition team braves freezing temperatures and treacherous terrain in search of a hidden treasure rumored to be buried at an altitude of 10,000 feet. Armed with climbing gear and survival supplies, the team sets out on their perilous journey, navigating icy slopes and crevasses along the way. With each step, they draw closer to their goal, fueled by the promise of adventure and the thrill of discovery. But as night falls and temperatures plummet, they must rely on their wits and teamwork to overcome the challenges that lie ahead."   
]
let previousParaIndex = 0;

const generateRandomParagraph = (punctuation, numbers, words_list) => {
    let paraIndex;
    
    do {
        paraIndex = Math.floor(Math.random() * paragraphs.length);
    } while (paraIndex === previousParaIndex);

    previousParaIndex = paraIndex;

    const randomParagraph = paragraphs[paraIndex];
    
    let filteredParagraph = randomParagraph;

    if (punctuation === 'off') {
        filteredParagraph = filteredParagraph.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g, '');
    }

    if (numbers === 'off') {
        filteredParagraph = filteredParagraph.replace(/[0-9]/g, '');
    }

    if (words_list === 'simple') {
        filteredParagraph = filteredParagraph.toLowerCase();
        
    }

    return filteredParagraph;
};


module.exports=generateRandomParagraph;