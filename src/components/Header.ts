import cuLogo from '/cu-logo.svg'

interface HeaderData {
  image: string;
  title: string;
}

export const Header = ({ image, title }: HeaderData) => {
  return `
    <div style="background-image: url(${image})" class="bg-cover h-64 relative" >
      <div class="bg-cover h-64 w-full absolute bottom-0 left-0 bg-gradient-to-t from-black to-transparent opacity-75"></div>
      <div class="absolute bottom-0 left-0 h-16 m-5 flex items-center">
        <a href="https://www.cardiff.ac.uk/" target="_blank" rel="noopener noreferrer">
          <img src="${cuLogo}" alt="Cardiff University Logo" class="h-16 w-auto" />
        </a>
        <div class="text-cardiff-light text-4xl m-5">${title}</div>
      </div>
    </div>`
}