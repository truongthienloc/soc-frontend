.text

#The program finds the value of fibonacci 

Fibo:
		addi    x13 , x0 , 5 
		addi    x30 , x0 , 1 
		addi    x8 , x0 , 1 
		addi    x9 , x0 , 3 
		beq     x13 , x0 , Result0 
		beq     x13 , x8 , Result1 
Loop: 
		blt     x13 , x9 , Result 
		add     x6 , x30 , x8 
		addi    x30 , x8 , 0 
		addi    x8 , x6 , 0 
		addi    x9 , x9 , 1 
		jal     x0 , Loop 
Result0:
		addi    x6 , x0 , 0 
		addi    x16 , x0 , 0 
		bne     x6 , x16 , Fail 
Result1:
		addi    x6 , x0 , 1 
		addi    x12 , x0 , 1 
		bne     x6 , x12 , Fail 
Result:
		addi    x31 , x0 , 5 
		bne     x6 , x31 , Result1 

Pass: 
		addi    x1 , x0 , 084 
		jal     x0 , End 
Fail: 
		addi    x1 , x0 , 070 
End: 
