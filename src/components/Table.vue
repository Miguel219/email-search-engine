<script lang="ts">
import Button from "./Button.vue";

export interface ColumnTypes {
  name: string;
  key: string;
  type?: "button";
}

export default {
  name: "Table",
  components: { Button: Button },
  props: {
    columns: {
      type: Array<ColumnTypes>,
      required: true,
    },
    data: {
      type: Array<any>,
      required: true,
    },
    isLoading: {
      type: Boolean,
      required: true,
    },
    page: {
      type: Number,
      required: true,
    },
    pageSize: {
      type: Number,
      required: true,
    },
    total: {
      type: Number,
      required: true,
    },
    prevFunction: {
      type: Function,
      required: true,
    },
    nextFunction: {
      type: Function,
      required: true,
    },
    buttonFunction: {
      type: Function,
      required: false,
    },
  },
};
</script>

<template>
  <div class="min-w-full drop-shadow-lg rounded-lg">
    <div v-if="isLoading">Cargando...</div>
    <table v-else class="table-auto overflow-x-scroll">
      <thead>
        <tr>
          <th
            v-for="column in columns"
            class="px-5 py-3 border-b-2 border-gray-400 bg-gray-200 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider"
          >
            {{ column.name }}
          </th>
        </tr>
      </thead>
      <tbody class="overflow-y-scroll h-32">
        <tr v-for="row in data">
          <td
            v-for="column in columns"
            class="px-5 py-2 border-b border-gray-200 bg-white text-sm"
          >
            <p
              v-if="column.type === 'button'"
              class="text-gray-900 whitespace-no-wrap"
            >
              <Button
                :button-function="
                  () => {
                    if (buttonFunction) {
                      buttonFunction(column.key, row);
                    }
                  }
                "
                :condition="true"
                :text="row[column.key]"
                custom-class="rounded"
              />
            </p>
            <p v-else class="text-gray-900 whitespace-no-wrap">
              {{ row[column.key] }}
            </p>
          </td>
        </tr>
      </tbody>
    </table>
    <div
      class="px-5 py-5 bg-white border-t flex flex-col xs:flex-row items-center xs:justify-between"
    >
      <span class="text-xs xs:text-sm text-gray-900">
        {{ page * pageSize + 1 }} -
        {{ Math.min(page * pageSize + pageSize, total) }}
        de
        {{ total }}
      </span>
      <div class="inline-flex mt-2 xs:mt-0">
        <Button
          :button-function="prevFunction"
          :condition="page != 0"
          text="Anterior"
          custom-class="rounded-l"
        />
        &nbsp; &nbsp;
        <Button
          :button-function="nextFunction"
          :condition="page * pageSize + pageSize < total"
          text="Siguiente"
          custom-class="rounded-r"
        />
      </div>
    </div>
  </div>
</template>
