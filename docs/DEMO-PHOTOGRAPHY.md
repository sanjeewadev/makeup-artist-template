# Demo Photography

The template includes an external demo-photography layer so a fresh CMS installation looks complete before real client content is uploaded.

## Behavior

- Payload content always takes priority.
- Demo Portfolio projects appear only when there are no published Portfolio projects.
- Demo Services appear only when there are no published Services.
- Demo testimonials appear when no matching testimonials exist.
- Demo About content appears only when the About global has no meaningful client content.
- Demo Journal stories appear only when there are no published Journal posts.
- The homepage uses demo featured content when its CMS selections are empty.
- The homepage hero uses demo photography only when no CMS hero image is set.

This keeps the template presentation-ready without inserting fake records into Payload.

## Image provider

Demo photography is loaded remotely from Pexels.

Source pages used for the demo set include:

- https://www.pexels.com/photo/stunning-artistic-bridal-fashion-makeup-portrait-30825631/
- https://www.pexels.com/photo/bridal-makeup-application-close-up-34025162/
- https://www.pexels.com/photo/bride-getting-ready-with-professional-makeup-artist-34037599/
- https://www.pexels.com/photo/elegant-bridal-portrait-with-glamorous-makeup-29352013/
- https://www.pexels.com/photo/model-posing-in-glossy-makeup-15579920/
- https://www.pexels.com/photo/a-woman-looking-at-the-camera-4927364/
- https://www.pexels.com/photo/woman-doing-makeup-to-model-in-studio-6044654/
- https://www.pexels.com/photo/crop-visagiste-applying-eyeshadows-on-female-model-6954217/
- https://www.pexels.com/photo/indian-bride-makeup-10954271/
- https://www.pexels.com/photo/makeup-of-bride-19730652/
- https://www.pexels.com/photo/face-of-bride-18478116/

The source pages identify these photos as free/free to use.

## Production guidance

The demo layer is for presentation and template setup.

For a real client launch:

1. upload the artist's real photography into Payload Media,
2. create real Portfolio projects,
3. assign real Service photography,
4. upload the artist portrait,
5. publish real testimonials and Journal content,
6. confirm every real image has accurate alternative text.

Once real CMS content exists, the relevant demo content automatically disappears.

## Technical location

Demo content:

`src/lib/demo-content.ts`

Remote image allowlist:

`next.config.ts`

Do not copy demo records into the production database unless the client explicitly wants them.
