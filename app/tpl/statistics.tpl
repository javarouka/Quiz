<div>
    <div id="rank-topn" style="margin: 5 auto;">
        <table class="table table-striped">
        <caption class="caption-t">랭킹 Top 20</caption>
        <thead>
        <tr>
        <th>순위</th>
        <th>ID</th>
        <th>점수</th>
        <th>성별</th>
        </tr>
        </thead>
        <tbody>
        <% _.each(statistics.rankTopN, function(item, i) { %>
            <tr>
            <td><%= (i+1) %></td>
            <td><%= (item.email || "알수없음").split("@")[0] %></td>
            <td><%= item.score %></td>
            <td><%= item.gender == 1 ? '남' : '여' %></td>
        <% }); %>
        </tbody>
        </table>
    </div>

    <hr />

    <div class="row">
        <div id="gender-dist" class="col-md-4">
            <table class="table table-striped">
                <caption class="caption-t">성별 분포</caption>
                <thead>
                <tr>
                <th>성별</th>
                <th>참여수</th>
                </tr>
                </thead>
                <tbody>
                <% _.each(statistics.groupGender, function(item, i) { %>
                    <tr>
                    <td><%= item.type == 'man' ? '남' : '여' %></td>
                    <td><%= item.CT %></td>
                <% }); %>
                </tbody>
            </table>
        </div>
        <div id="gender-rank-man" class="col-md-4">
            <table class="table table-striped">
                <caption class="caption-t">남자 순위</caption>
                <thead>
                <tr>
                <th>순위</th>
                <th>ID</th>
                <th>점수</th>
                </tr>
                </thead>
                <tbody>
                <% _.each(statistics.manRank, function(item, i) { %>
                    <tr>
                    <td><%= (i+1) %></td>
                    <td><%= item.email.split("@")[0] %></td>
                    <td><%= item.score %></td>
                <% }); %>
                </tbody>
            </table>
        </div>
        <div id="gender-rank-woman" class="col-md-4">
            <table class="table table-striped">
            <caption class="caption-t">여자 순위</caption>
            <thead>
            <tr>
            <th>순위</th>
            <th>ID</th>
            <th>점수</th>
            </tr>
            </thead>
            <tbody>
            <% _.each(statistics.womanRank, function(item, i) { %>
                <tr>
                <td><%= (i+1) %></td>
                <td><%= item.email.split("@")[0] %></td>
                <td><%= item.score %></td>
            <% }); %>
            </tbody>
            </table>
        </div>
    </div>
</div>