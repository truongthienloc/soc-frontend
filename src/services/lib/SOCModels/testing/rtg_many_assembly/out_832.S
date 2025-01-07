.text

#The program finds the value of fibonacci 

Fibo:
		addi    x27 , x0 , 4 
		addi    x17 , x0 , 1 
		addi    x29 , x0 , 1 
		addi    x3 , x0 , 3 
		beq     x27 , x0 , Result0 
		beq     x27 , x29 , Result1 
Loop: 
		blt     x27 , x3 , Result 
		add     x11 , x17 , x29 
		addi    x17 , x29 , 0 
		addi    x29 , x11 , 0 
		addi    x3 , x3 , 1 
		jal     x0 , Loop 
Result0:
		addi    x11 , x0 , 0 
		addi    x30 , x0 , 0 
		bne     x11 , x30 , Fail 
Result1:
		addi    x11 , x0 , 1 
		addi    x31 , x0 , 1 
		bne     x11 , x31 , Fail 
Result:
		addi    x12 , x0 , 3 
		bne     x11 , x12 , Result1 

Pass: 
		addi    x1 , x0 , 084 
		jal     x0 , End 
Fail: 
		addi    x1 , x0 , 070 
End: 
