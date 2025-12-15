interface CardDetails {
  image: string;
  name: string;
  id: string;
  description: string;
  programs: EventDetails[];
}

interface EventDetails {
  title: string;
  startTime: string;
  endTime: string;
  location: string;
}

interface ProgramDetails {
  title: string;
  indexTitle: string;
  events: EventDetails[];
}



const getFriendlyTime = (date: string) => {
  return new Date(date).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", hour12: false })
}

const flattenPrograms = (programs: EventDetails[]) => {
  const uniquePrograms:ProgramDetails[] = [];
  programs.forEach(currentEvent => {
    // NOTE: Text matching is not great, but there appears to be no unique ID for common programs?
    const program = uniquePrograms.find((event) => { return event.indexTitle === currentEvent.title.toLowerCase()});
    if (!program) {
      uniquePrograms.push({
        indexTitle: currentEvent.title.toLowerCase(),
        title: currentEvent.title,
        events: [currentEvent]
      })
    } else {
      program.events.push(currentEvent);
    }
  })

  return uniquePrograms
}

export const Card = ({ image, name, id, description, programs }: CardDetails) => {
  const flattenedPrograms = flattenPrograms(programs);
  return `
    <div class="bg-cardiff-light p-5 mb-5 cursor-pointer" id="${id}"} onClick="(() => document.getElementById('${id}-events')?.classList.toggle('hidden'))()"> 
      <div class="flex row">
        <img src=${image} class="w-64 min-w-64 h-32 min-h-32 object-cover" />
        <div class="flex flex-col text-left ml-5">
          <div class="text-cardiff-red text-2xl">${name}</div>
          <div class >${description}</div>
        </div>
      </div>
      <div id="${id}-events" class="text-left text-sm mt-5 hidden">
        <ul class="list-inside">
        ${flattenedPrograms.map((program => {
          return `
            <li class="text-cardiff-dark font-semibold">${program.title}
            <ul class="list-disc list-inside pl-5 font-normal">${program.events.map(event => `<li>${getFriendlyTime(event.startTime)} - ${getFriendlyTime(event.endTime)} ${event.location ? `(${event.location?.trim()})` : ''}</li>`).join('')}</ul>
            </li>
          `
        })).join('')}
        </ul>
      </div>
    </div>
  `
}