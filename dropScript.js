$(document).ready(function() {
    $(".redBox").click(function(event) {
		if($(this).css("background-color")=="rgb(255, 0, 0)")
		{
			$(this).toggleClass("redBox");
			$(this).addClass("emptyBox");
			if ($("#playerMessage").text() == "Player 1's Turn")
				{
					player = 1;
					$("#playerMessage").replaceWith("<h2 id = 'playerMessage'>Player 2's Turn</h2>")
				}
			else if ($("#playerMessage").text() == "Player 2's Turn"){
				player = 2;
				$("#playerMessage").replaceWith("<h2 id = 'playerMessage'>Player 1's Turn</h2>")
			}
			var queens = $.fn.checkWin();
			if (queens.length > 0)
			{
				if(player == 1)
				{
					var scorephrase = $("#score1").text();
					var current = parseInt(scorephrase[scorephrase.length-1]);
					current += queens.length;
					var textphrase = "Player 1: " + current.toString();
					$("#score1").replaceWith("<h2 class='alignLeft' id = 'score1'> "+ textphrase + "</h2>")
				}
				else
				{
					var scorephrase = $("#score2").text();
					var current = parseInt(scorephrase[scorephrase.length-1]);
					current += queens.length;
					var textphrase = "Player 2: " + current.toString();
					$("#score2").replaceWith("<h2 class='alignRight' id = 'score2'> "+ textphrase + "</h2>")
				}
				var sp1 = $("#score1").text();
				var sp2 = $("#score2").text();
				var c1 = parseInt(sp1[sp1.length-1]);
				var c2 = parseInt(sp2[sp2.length-1]);
				if(c1+c2 == 4){
					if(c1 == c2){
						alert("Game resulted in a Draw!");
						$("#playerMessage").replaceWith("<h2 id = 'playerMessage'>DRAW!</h2>")
					}
					else if (c1>c2){
						alert("Player 1 Won!");
						$("#playerMessage").replaceWith("<h2 id = 'playerMessage'>Player 1 Won the Game!</h2>")
					}
					else{
						alert("Player 2 Won!");
						$("#playerMessage").replaceWith("<h2 id = 'playerMessage'>Player 2 Won the Game!</h2>")
					}
					alert("Player 1 : " + c1 + "\nPlayer 2 : " + c2 + "\nReload the Page to Play Again!");
				}
				
			}
		}
    });
	$.fn.findChip = function(s, number){
		if(s.indexOf(number)==-1)
			return false;
		else
			return true;
	}
	$.fn.checkWin = function() {
		var visited = [];
		var queens = []
		var found = $.fn.recFunc(22, visited);
		if (!found){
			var onPage = $.fn.findChip($("#chipsMessage").text(), 1);
			if (!onPage)
			{
				$("#22").css("background-color", "gray")
				var current = $("#chipsMessage").text();
				if(current == "Chips Dropped : 0")
					current = "Chips Dropped : 1";
				else
					current += ", 1";
				$("#chipsMessage").replaceWith("<h2 id = 'chipsMessage'>" + current + "</h2>")
				queens.push(1);
			}
		}
		visited = []
		found = $.fn.recFunc(45, visited);
		if (!found){
			var onPage = $.fn.findChip($("#chipsMessage").text(), 2);
			if (!onPage)
			{
				$("#45").css("background-color", "gray");
				var current = $("#chipsMessage").text();
				if(current == "Chips Dropped : 0")
					current = "Chips Dropped : 2";
				else
					current += ", 2";
				$("#chipsMessage").replaceWith("<h2 id = 'chipsMessage'>" + current + "</h2>")
				queens.push(2);
			}
		}
		visited = []
		found = $.fn.recFunc(57, visited);
		if (!found){
			var onPage = $.fn.findChip($("#chipsMessage").text(), 3);
			if (!onPage)
			{
				$("#57").css("background-color", "gray")
				var current = $("#chipsMessage").text();
				if(current == "Chips Dropped : 0")
					current = "Chips Dropped : 3";
				else
					current += ", 3";
				$("#chipsMessage").replaceWith("<h2 id = 'chipsMessage'>" + current + "</h2>")
				queens.push(3)
			}
		}
		visited = []
		found = $.fn.recFunc(62, visited);
		if (!found){
			var onPage = $.fn.findChip($("#chipsMessage").text(), 4);
			if (!onPage)
			{
				$("#62").css("background-color", "gray")
				var current = $("#chipsMessage").text();
				if(current == "Chips Dropped : 0")
					current = "Chips Dropped : 4";
				else
					current += ", 4";
				$("#chipsMessage").replaceWith("<h2 id = 'chipsMessage'>" + current + "</h2>")
				queens.push(4);
			}
		}
		return queens;
	}
	$.fn.recFunc = function(queen, visited) {
		if(visited.indexOf(queen)==-1){
			
			if($("#"+queen).css("background-color") == "rgb(0, 0, 0)"){
				return true;
			}
			else if($("#"+queen).css("background-color") == "rgb(255, 255, 255)")
			{
				return false;
			}
			else{
				var left = queen-1;
				var right = queen+1;
				var leftUp = left - 10;
				var leftDown = 0;
				var rightUp = 0;
				var rightDown = 0;
				if (queen<40){
					leftUp = left - 10;
					leftDown = left + 11;
					rightUp = right - 11;
					rightDown = right + 10;
				}
				else if(queen>40 && queen<50){
					leftUp = left - 10;
					leftDown = left + 10;
					rightUp = right - 11;
					rightDown = right + 9;
				}
				else{
					leftUp = left - 9;
					leftDown = left + 10;
					rightUp = right - 10;
					rightDown = right + 9;
				}
				visited.push(queen);
				
				
				if($.fn.recFunc(left, visited))
					return true;
				else if ($.fn.recFunc(right, visited))
					return true;
				else if ($.fn.recFunc(leftUp, visited))
					return true;
				else if ($.fn.recFunc(leftDown, visited))
					return true;
				else if ($.fn.recFunc(rightDown, visited))
					return true;
				else if ($.fn.recFunc(rightUp, visited))
					return true;
				else
					return false;
			}
		}
		
		
	}
});