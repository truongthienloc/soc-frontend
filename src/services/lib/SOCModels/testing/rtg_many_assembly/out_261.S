.text

#The program finds the value of fibonacci 

Fibo:
		addi    x11 , x0 , 13 
		addi    x4 , x0 , 1 
		addi    x27 , x0 , 1 
		addi    x25 , x0 , 3 
		beq     x11 , x0 , Result0 
		beq     x11 , x27 , Result1 
Loop: 
		blt     x11 , x25 , Result 
		add     x15 , x4 , x27 
		addi    x4 , x27 , 0 
		addi    x27 , x15 , 0 
		addi    x25 , x25 , 1 
		jal     x0 , Loop 
Result0:
		addi    x15 , x0 , 0 
		addi    x1 , x0 , 0 
		bne     x15 , x1 , Fail 
Result1:
		addi    x15 , x0 , 1 
		addi    x2 , x0 , 1 
		bne     x15 , x2 , Fail 
Result:
		addi    x3 , x0 , 233 
		bne     x15 , x3 , Result1 

Pass: 
		addi    x1 , x0 , 084 
		jal     x0 , End 
Fail: 
		addi    x1 , x0 , 070 
End: 
