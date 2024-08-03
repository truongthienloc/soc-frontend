.text

#The program finds the value of fibonacci 

Fibo:
		addi    x22 , x0 , 8 
		addi    x13 , x0 , 1 
		addi    x16 , x0 , 1 
		addi    x19 , x0 , 3 
		beq     x22 , x0 , Result0 
		beq     x22 , x16 , Result1 
Loop: 
		blt     x22 , x19 , Result 
		add     x2 , x13 , x16 
		addi    x13 , x16 , 0 
		addi    x16 , x2 , 0 
		addi    x19 , x19 , 1 
		jal     x0 , Loop 
Result0:
		addi    x2 , x0 , 0 
		addi    x20 , x0 , 0 
		bne     x2 , x20 , Fail 
Result1:
		addi    x2 , x0 , 1 
		addi    x10 , x0 , 1 
		bne     x2 , x10 , Fail 
Result:
		addi    x6 , x0 , 21 
		bne     x2 , x6 , Result1 

Pass: 
		addi    x1 , x0 , 084 
		jal     x0 , End 
Fail: 
		addi    x1 , x0 , 070 
End: 
