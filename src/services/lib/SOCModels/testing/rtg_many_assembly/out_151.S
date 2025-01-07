.text

#The program finds the value of fibonacci 

Fibo:
		addi    x4 , x0 , 5 
		addi    x23 , x0 , 1 
		addi    x2 , x0 , 1 
		addi    x15 , x0 , 3 
		beq     x4 , x0 , Result0 
		beq     x4 , x2 , Result1 
Loop: 
		blt     x4 , x15 , Result 
		add     x31 , x23 , x2 
		addi    x23 , x2 , 0 
		addi    x2 , x31 , 0 
		addi    x15 , x15 , 1 
		jal     x0 , Loop 
Result0:
		addi    x31 , x0 , 0 
		addi    x9 , x0 , 0 
		bne     x31 , x9 , Fail 
Result1:
		addi    x31 , x0 , 1 
		addi    x18 , x0 , 1 
		bne     x31 , x18 , Fail 
Result:
		addi    x16 , x0 , 5 
		bne     x31 , x16 , Result1 

Pass: 
		addi    x1 , x0 , 084 
		jal     x0 , End 
Fail: 
		addi    x1 , x0 , 070 
End: 
