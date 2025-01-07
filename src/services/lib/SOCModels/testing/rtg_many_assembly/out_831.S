.text

#The program finds the value of fibonacci 

Fibo:
		addi    x3 , x0 , 10 
		addi    x12 , x0 , 1 
		addi    x27 , x0 , 1 
		addi    x15 , x0 , 3 
		beq     x3 , x0 , Result0 
		beq     x3 , x27 , Result1 
Loop: 
		blt     x3 , x15 , Result 
		add     x30 , x12 , x27 
		addi    x12 , x27 , 0 
		addi    x27 , x30 , 0 
		addi    x15 , x15 , 1 
		jal     x0 , Loop 
Result0:
		addi    x30 , x0 , 0 
		addi    x5 , x0 , 0 
		bne     x30 , x5 , Fail 
Result1:
		addi    x30 , x0 , 1 
		addi    x7 , x0 , 1 
		bne     x30 , x7 , Fail 
Result:
		addi    x23 , x0 , 55 
		bne     x30 , x23 , Result1 

Pass: 
		addi    x1 , x0 , 084 
		jal     x0 , End 
Fail: 
		addi    x1 , x0 , 070 
End: 
