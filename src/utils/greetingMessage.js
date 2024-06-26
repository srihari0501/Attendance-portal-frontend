// greetingMessage.js

export function getGreetingMessage(hour) {
    let greeting = '';

    if (hour >= 0 && hour < 12) {
        greeting = 'Good morning';
    } else if (hour >= 12 && hour < 18) {
        greeting = 'Good afternoon';
    } else {
        greeting = 'Good evening';
    }

    return greeting;
}
