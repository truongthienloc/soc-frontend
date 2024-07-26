.text

#The program finds the value of fibonacci 

Fibo:
		addi    x12 , x0 , 16 
		addi    x1 , x0 , 1 
		addi    x11 , x0 , 1 
		addi    x9 , x0 , 3 
		beq     x12 , x0 , Result0 
		beq     x12 , x11 , Result1 
Loop: 
		blt     x12 , x9 , Result 
		add     x15 , x1 , x11 
		addi    x1 , x11 , 0 
		addi    x11 , x15 , 0 
		addi    x9 , x9 , 1 
		jal     x0 , Loop 
Result0:
		addi    x15 , x0 , 0 
		addi    x2 , x0 , 0 
		bne     x15 , x2 , Fail 
Result1:
		addi    x15 , x0 , 1 
		addi    x30 , x0 , 1 
		bne     x15 , x30 , Fail 
Result:
		addi    x8 , x0 , 987 
		bne     x15 , x8 , Result1 

Pass: 
		addi    x1 , x0 , 084 
		jal     x0 , End 
Fail: 
		addi    x1 , x0 , 070 
End: 
