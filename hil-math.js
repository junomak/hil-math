        // Combinatorial functions.
        function factorial(n) {
            if (!(JXG.isNumber(n) && n % 1 === 0)) throw "Input must be an integer.";
            if (n === 0 || n === 1) return 1;
            else return n * factorial(n - 1);
        }

        function nPr(n, r) {
            if (!(JXG.isNumber(n) && n % 1 === 0 && JXG.isNumber(r) && r % 1 === 0)) throw "Input must be an integer.";
            if (r > n) return 0;
            if (r === 0) return 1;
            if (r === 1) return n;
            return n * nPr(n - 1, r - 1);
        }

        /*function nCr(n, r) {
            if (!(JXG.isNumber(n) && n % 1 === 0 && JXG.isNumber(r) && r % 1 === 0)) throw "Input must be an integer.";
            if (r > n) return 0;
            if (r > n / 2) r = n - r;
            return nPr(n, r) / factorial(r);
        }*/
        
        function nCr(n, r) {
            if (!(JXG.isNumber(n) && n % 1 === 0 && JXG.isNumber(r) && r % 1 === 0)) throw "Input must be an integer.";
            if (r > n) return 0;
            if (n == 1) return 1;
            if (r == 0) return 1;
            if (r == n) return 1;
            return nCr(n-1, r-1)+nCr(n-1, r);
        }
        
        //genearting random Permutation: listing r objects from [0,1,2,...,n-1] 
	function randomPermutation(r, n) {	
		var pool=[], recordRand=[];		
		for (i=0; i<n; i++){
			pool.push(i);
		}
		recordRand.length = 0;
		for (i=0; i<r; i++) {
			var next = pool[Math.floor(Math.random()*pool.length)];
			recordRand.push(next);
			var index = pool.indexOf(next);
			if (index > -1) {
				pool.splice(index, 1);
			}
		}
		return recordRand;
	}
	//generate random record of: choosing r objects from [0,1,2,...,n-1] 
	function randomCombination(r, n) {	
		var recordRand=[];		
		recordRand= randomPermutation(r, n);
		recordRand = recordRand.sort(function(a, b){return a-b});
		return recordRand;
	}
	
        // Calculate binomial probability P(X=x) when X ~ B(n,p).
        function binomialProb(n, x, p) {
            return nCr(n, x) * Math.pow(p, x) * Math.pow(1 - p, n - x);
        }

        // Calculate binomial probability P(a<=X<=b) when X ~ B(n,p).
        function binomialProbSum(n, a, b, p) {
            var prob = 0;
            b = b ? b : a;
            for (var i = a; i <= b; i++) {
                prob += binomialProb(n, i, p);
            }
            return prob;
        }

        // Calculate geometric probability P(X=x) when X ~ Geo(p).
        function geometricProb(p, x) {
            if (x <= 0 || x % 1 !== 0) return 0;
            return Math.pow(1 - p, x - 1) * p;
        }

        // Calculate geometric probability P(x1<=X<=x2) when X ~ Geo(p).
        function geometricProbSum(p, x1, x2) {
            if (x2 === Infinity) return (1 - geometricProbSum(p, 1, x1));
            var prob = 0;
            x2 = x2 ? x2 : x1;
            for (var i = x1; i <= x2; i++) {
                prob += geometricProb(p, i);
            }
            return prob;
        }


        // Calculate Poisson probability P(X=x) when X ~ Po(lambda).
        function poissonProb(l, x) {
            if (x < 0 || x % 1 !== 0) return 0;
            return Math.pow(Math.E, -l) * Math.pow(l, x) / factorial(x);
        }

        function poissonProbSum(l, x1, x2) {
            if (x2 === Infinity) return (1 - poissonProbSum(l, 0, x1));
            var prob = 0;
            x2 = x2 ? x2 : x1;
            for (var i = x1; i <= x2; i++) {
                prob += poissonProb(l, i);
            }
            return prob;
        }
