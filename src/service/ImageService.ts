const RANDOM_IMAGE_URL = "https://picsum.photos/450";
// const RANDOM_IMAGE_URL = "https://source.unsplash.com/random";
// const RANDOM_IMAGE_URL = "https://www.adobe.com/acrobat/hub/media_173d13651460eb7e12c0ef4cf8410e0960a20f0ee.jpeg?width=750&format=jpeg&optimize=medium";
// const RANDOM_IMAGE_URL =
  // "https://images.unsplash.com/photo-1714138665028-95e35021d928?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";

export async function fetchRandomImage() {
  return fetch(RANDOM_IMAGE_URL).then((res) => res.blob());
}
