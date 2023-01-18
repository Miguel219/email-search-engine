<script lang="ts">
export default {
  name: "InitialsImage",
  props: {
    size: {
      type: Number,
      default: 40,
    },
    name: {
      type: String,
      default: "",
    },
  },
  data() {
    return {
      colors: [
        "#004958",
        "#008080",
        "#00CCCC",
        "#00b7Eb",
        "#00ffcc",
        "#01796F",
        "#044141",
        "#11b9ba",
        "#1de9b6",
        "#31e3c4",
        "#3AA8C1",
        "#4cdbd4",
        "#6dac98",
        "#72a7a8",
      ],
    };
  },
  computed: {
    getImage: function () {
      return this.getDataURI(this.name, this.size);
    },
  },
  methods: {
    getDataURI(name: string, size: number) {
      const nameSplit = String(name).toUpperCase().split(" ");
      const charCodeSum = nameSplit
        .map((c) => {
          return c.charCodeAt(0);
        })
        .reduce((a, b) => a + b, 0);
      var initials, canvas, context, dataURI;

      if (nameSplit.length == 1) {
        initials = nameSplit[0] ? nameSplit[0].charAt(0) : "?";
      } else {
        initials = nameSplit[0].charAt(0) + nameSplit[1].charAt(0);
      }

      if (window.devicePixelRatio) {
        size = size * window.devicePixelRatio;
      }

      canvas = document.createElement("canvas");
      canvas.width = size;
      canvas.height = size;
      context = canvas.getContext("2d");
      if (context) {
        context.fillStyle = this.colors[charCodeSum % this.colors.length];
        context.fillRect(0, 0, canvas.width, canvas.height);
        context.font = Math.round(canvas.width / 2) + "px Arial";
        context.textAlign = "center";
        context.fillStyle = "#FFF";
        context.fillText(initials, size / 2, size / 1.5);
      }

      dataURI = canvas.toDataURL();
      canvas = null;

      return dataURI;
    },
  },
};
</script>
<template>
  <img :src="getImage" class="rounded-full" />
</template>
