.text

#The program finds the value of fibonacci 

Fibo:
		addi    x9 , x0 , 2 
		addi    x22 , x0 , 1 
		addi    x10 , x0 , 1 
		addi    x2 , x0 , 3 
		beq     x9 , x0 , Result0 
		beq     x9 , x10 , Result1 
Loop: 
		blt     x9 , x2 , Result 
		add     x31 , x22 , x10 
		addi    x22 , x10 , 0 
		addi    x10 , x31 , 0 
		addi    x2 , x2 , 1 
		jal     x0 , Loop 
Result0:
		addi    x31 , x0 , 0 
		addi    x23 , x0 , 0 
		bne     x31 , x23 , Fail 
Result1:
		addi    x31 , x0 , 1 
		addi    x16 , x0 , 1 
		bne     x31 , x16 , Fail 
Result:
		addi    x13 , x0 , 1 
		bne     x31 , x13 , Result1 

Pass: 
		addi    x1 , x0 , 084 
		jal     x0 , End 
Fail: 
		addi    x1 , x0 , 070 
End: 
