// Utility to fetch and display Open Day data from public/OpenDay14.json
import './style.css'

import { Header } from './components/Header'
import { Menu } from './components/Menu'
import { Card } from './components/Card'

async function loadOpenDay() {
  // Use the correct base path for GitHub Pages
  const base = import.meta.env.BASE_URL || '/';
  const res = await fetch(`${base}api/OpenDay.json`)
  const data = await res.json()

  return data
}

function createValidId(title: string) {
  return title.toLowerCase().replace(/\s+/g, '_').replace(/\W/g, '')
}

function renderOpenDay(data: any) {
  const app = document.querySelector<HTMLDivElement>('#app')!
  if (!data.topics) {
    app.innerHTML = '<p class="text-red-600">No Open Day data found.</p>'
    return
  }

  app.innerHTML = `
    ${Header({
      image: data.cover_image,
      title: `${data.description} (${new Date(data.start_time).toDateString()})`
    })}
    <div class="min-h-screen bg-cardiff-white font-sans px-2 py-6 flex">
      ${Menu(data.topics.map((topic: any) => {
        const title = topic.name.trim() || '';
        return {
          title,
          menuId: createValidId(title)
        }
      }))}
      <div class="flex flex-col">
        ${data.topics.map((topic:any) => Card({
          image: topic.cover_image,
          name: topic.name.trim(),
          id: createValidId(topic.name.trim()),
          description: topic.description,
          programs: topic.programs.map((program: any) => {
            return {
              title: program.title,
              startTime: program.start_time,
              endTime: program.end_time,
              location: program.room
            }
          })
        })).join('')}
  `
}

loadOpenDay().then(renderOpenDay)
