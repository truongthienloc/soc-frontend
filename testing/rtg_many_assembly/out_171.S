.text

#The program finds the value of fibonacci 

Fibo:
		addi    x14 , x0 , 13 
		addi    x18 , x0 , 1 
		addi    x9 , x0 , 1 
		addi    x2 , x0 , 3 
		beq     x14 , x0 , Result0 
		beq     x14 , x9 , Result1 
Loop: 
		blt     x14 , x2 , Result 
		add     x24 , x18 , x9 
		addi    x18 , x9 , 0 
		addi    x9 , x24 , 0 
		addi    x2 , x2 , 1 
		jal     x0 , Loop 
Result0:
		addi    x24 , x0 , 0 
		addi    x29 , x0 , 0 
		bne     x24 , x29 , Fail 
Result1:
		addi    x24 , x0 , 1 
		addi    x3 , x0 , 1 
		bne     x24 , x3 , Fail 
Result:
		addi    x13 , x0 , 233 
		bne     x24 , x13 , Result1 

Pass: 
		addi    x1 , x0 , 084 
		jal     x0 , End 
Fail: 
		addi    x1 , x0 , 070 
End: 
