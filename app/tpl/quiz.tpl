<form class="quiz-form">
<dl>
<% _.each(list, function(item, i) { %>
    <dt><span><%=(i+1)%>. </span><%= item.title %></dt>
    <dd>
        <ul class="quiz-list">
        <% _.each(item.answers, function(answer, i) { %>
            <li>
                <input type="radio" name="<%= item.id %>", value="<%= item.id %>-<%= i %>">
                <%= answer %>
            </li>
        <% }); %>
        </ul>
    </dd>
<% }); %>
</dl>
<button type="submit" class="btn btn-primary">다 풀었어요~!</button>
</form>