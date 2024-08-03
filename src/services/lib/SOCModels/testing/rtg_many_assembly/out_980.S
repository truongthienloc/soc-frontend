.text

#The program finds the value of fibonacci 

Fibo:
		addi    x19 , x0 , 14 
		addi    x14 , x0 , 1 
		addi    x13 , x0 , 1 
		addi    x8 , x0 , 3 
		beq     x19 , x0 , Result0 
		beq     x19 , x13 , Result1 
Loop: 
		blt     x19 , x8 , Result 
		add     x31 , x14 , x13 
		addi    x14 , x13 , 0 
		addi    x13 , x31 , 0 
		addi    x8 , x8 , 1 
		jal     x0 , Loop 
Result0:
		addi    x31 , x0 , 0 
		addi    x16 , x0 , 0 
		bne     x31 , x16 , Fail 
Result1:
		addi    x31 , x0 , 1 
		addi    x3 , x0 , 1 
		bne     x31 , x3 , Fail 
Result:
		addi    x23 , x0 , 377 
		bne     x31 , x23 , Result1 

Pass: 
		addi    x1 , x0 , 084 
		jal     x0 , End 
Fail: 
		addi    x1 , x0 , 070 
End: 
