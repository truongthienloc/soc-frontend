.text

#The program finds the value of fibonacci 

Fibo:
		addi    x24 , x0 , 3 
		addi    x30 , x0 , 1 
		addi    x15 , x0 , 1 
		addi    x6 , x0 , 3 
		beq     x24 , x0 , Result0 
		beq     x24 , x15 , Result1 
Loop: 
		blt     x24 , x6 , Result 
		add     x12 , x30 , x15 
		addi    x30 , x15 , 0 
		addi    x15 , x12 , 0 
		addi    x6 , x6 , 1 
		jal     x0 , Loop 
Result0:
		addi    x12 , x0 , 0 
		addi    x31 , x0 , 0 
		bne     x12 , x31 , Fail 
Result1:
		addi    x12 , x0 , 1 
		addi    x4 , x0 , 1 
		bne     x12 , x4 , Fail 
Result:
		addi    x16 , x0 , 2 
		bne     x12 , x16 , Result1 

Pass: 
		addi    x1 , x0 , 084 
		jal     x0 , End 
Fail: 
		addi    x1 , x0 , 070 
End: 
