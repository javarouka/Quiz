<div>
    <table class="table table-striped">
    <caption class="caption-t">유저</caption>
    <thead>
    <tr>
    <th>순위</th>
    <th>ID</th>
    <th>점수</th>
    <th>성별</th>
    </tr>
    </thead>
    <tbody>
    <% _.each(alluser, function(item, i) { %>
        <tr>
        <td><%= (i+1) %></td>
        <td><%= (item.email || "알수없음") %></td>
        <td><%= item.score %></td>
        <td><%= item.gender == 1 ? '남' : '여' %></td>
    <% }); %>
    </tbody>
    </table>
    <button id="reset-info">정보 리셋</button>
</div>