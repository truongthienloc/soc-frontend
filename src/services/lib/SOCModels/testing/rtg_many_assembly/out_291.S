.text

#The program finds the value of fibonacci 

Fibo:
		addi    x17 , x0 , 9 
		addi    x25 , x0 , 1 
		addi    x10 , x0 , 1 
		addi    x20 , x0 , 3 
		beq     x17 , x0 , Result0 
		beq     x17 , x10 , Result1 
Loop: 
		blt     x17 , x20 , Result 
		add     x5 , x25 , x10 
		addi    x25 , x10 , 0 
		addi    x10 , x5 , 0 
		addi    x20 , x20 , 1 
		jal     x0 , Loop 
Result0:
		addi    x5 , x0 , 0 
		addi    x4 , x0 , 0 
		bne     x5 , x4 , Fail 
Result1:
		addi    x5 , x0 , 1 
		addi    x15 , x0 , 1 
		bne     x5 , x15 , Fail 
Result:
		addi    x29 , x0 , 34 
		bne     x5 , x29 , Result1 

Pass: 
		addi    x1 , x0 , 084 
		jal     x0 , End 
Fail: 
		addi    x1 , x0 , 070 
End: 
