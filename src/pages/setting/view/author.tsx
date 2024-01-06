import { defineComponent } from 'vue'

export default defineComponent({
  setup() {
    return () => (
      <div class="setting-view-contanier--author" data-location="author">
        <h2>作者</h2>
        <ul>
          <li>
            <a href="https://github.com" target="_blank">
              Buddy
            </a>
          </li>
        </ul>
      </div>
    )
  }
})
