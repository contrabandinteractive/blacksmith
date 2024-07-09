export const maxDuration = 300;
import { NextResponse } from 'next/server'
import { Client } from "@gradio/client";


export async function POST(request) {

    let body = await request.json();
    let userInput = body.prompt;

  
    const apiUrl = process.env.NEXT_PUBLIC_SDAPI;

    const thePrompt = {
      prompt: "A highly detailed, realistic, hand drawn sketch of "+userInput+". A single item and/or person, entirely within the frame. Full body in view. No color, black and white.",
      negative_prompt: "multiple characters, cut-off",
      styles: ["realistic"],
      seed: -1,
      subseed: -1,
      subseed_strength: 0,
      seed_resize_from_h: -1,
      seed_resize_from_w: -1,
      sampler_name: "Euler",
      batch_size: 3,
      n_iter: 1,
      steps: 50,
      cfg_scale: 7,
      width: 512,
      height: 512,
      restore_faces: true,
      tiling: false,
      do_not_save_samples: false,
      do_not_save_grid: false,
      eta: 0,
      denoising_strength: 0,
      s_min_uncond: 0,
      s_churn: 0,
      s_tmax: 0,
      s_tmin: 0,
      s_noise: 0,
      override_settings: {},
      override_settings_restore_afterwards: true,
      refiner_checkpoint: "",
      refiner_switch_at: 0,
      disable_extra_networks: false,
      comments: {},
      enable_hr: false,
      firstphase_width: 0,
      firstphase_height: 0,
      hr_scale: 2,
      hr_upscaler: "",
      hr_second_pass_steps: 0,
      hr_resize_x: 0,
      hr_resize_y: 0,
      hr_checkpoint_name: "",
      hr_sampler_name: "",
      hr_prompt: "",
      hr_negative_prompt: "",
      sampler_index: "Euler",
      script_name: "",
      script_args: [],
      send_images: true,
      save_images: false,
      alwayson_scripts: {}
    }

    try {
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(thePrompt),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      console.log(result);

    return NextResponse.json({ result }, { status: 200 });




} catch (error) {
  console.error('Error:', error);
  return NextResponse.json({ message: 'error' }, { status: 500 });
}

}