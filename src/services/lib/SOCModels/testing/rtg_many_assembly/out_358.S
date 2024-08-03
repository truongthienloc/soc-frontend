.text

#The program finds the value of fibonacci 

Fibo:
		addi    x13 , x0 , 15 
		addi    x30 , x0 , 1 
		addi    x6 , x0 , 1 
		addi    x4 , x0 , 3 
		beq     x13 , x0 , Result0 
		beq     x13 , x6 , Result1 
Loop: 
		blt     x13 , x4 , Result 
		add     x3 , x30 , x6 
		addi    x30 , x6 , 0 
		addi    x6 , x3 , 0 
		addi    x4 , x4 , 1 
		jal     x0 , Loop 
Result0:
		addi    x3 , x0 , 0 
		addi    x20 , x0 , 0 
		bne     x3 , x20 , Fail 
Result1:
		addi    x3 , x0 , 1 
		addi    x29 , x0 , 1 
		bne     x3 , x29 , Fail 
Result:
		addi    x9 , x0 , 610 
		bne     x3 , x9 , Result1 

Pass: 
		addi    x1 , x0 , 084 
		jal     x0 , End 
Fail: 
		addi    x1 , x0 , 070 
End: 
