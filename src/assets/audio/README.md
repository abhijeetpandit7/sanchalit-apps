# Audio Assets for Soundscapes Feature

This directory should contain the audio files for the soundscape feature. 

## Required Audio Files

Add the following MP3 files to enable proper soundscape functionality:

### Nature Sounds
- `fire.mp3` - Crackling fire sound
- `crickets.mp3` - Cricket chirping
- `ocean.mp3` - Ocean waves
- `wind.mp3` - Wind blowing
- `seagulls.mp3` - Seagull calls
- `rain.mp3` - Rain falling
- `rain-on-surface.mp3` - Rain on surfaces
- `thunder.mp3` - Thunder sounds
- `loud-rain.mp3` - Heavy rain
- `stream.mp3` - Flowing water/stream
- `birds.mp3` - Bird chirping
- `insects.mp3` - General insect sounds
- `chimes.mp3` - Wind chimes

### Transportation
- `tracks.mp3` - Train on tracks

### Office/Indoor Sounds  
- `cafe.mp3` - Café ambiance
- `coffee-maker.mp3` - Coffee brewing sounds
- `co-workers.mp3` - Office chatter
- `copier.mp3` - Printer/copier sounds
- `air-conditioner.mp3` - AC humming
- `fluorescent-hum.mp3` - Light humming
- `mechanical-keyboard.mp3` - Typing sounds

## File Requirements

- **Format**: MP3 (preferred) or OGG/WAV
- **Quality**: 128kbps or higher for good quality
- **Length**: 10-30 seconds of looping audio content
- **License**: Ensure all audio files are royalty-free or properly licensed
- **Size**: Keep files under 1MB each for faster loading

## Usage

Once audio files are added here, update `src/utils/constants.js`:

1. Import the audio files at the top:
```javascript
import fireAudio from "../assets/audio/fire.mp3";
import rainAudio from "../assets/audio/rain.mp3";
// ... import other audio files
```

2. Replace the placeholder URLs in the SOUNDS object:
```javascript
const SOUNDS = {
    fire: {
        name: "Fire",
        icon: fireIcon,
        url: fireAudio,  // Use imported audio instead of URL
    },
    // ... update other entries
};
```

## Audio Sources

Recommended sources for royalty-free audio:
- Freesound.org (Creative Commons licensed)
- Pixabay Audio
- Zapsplat (free tier available)
- YouTube Audio Library
- BBC Sound Effects Library

Always verify licensing terms before using any audio content.