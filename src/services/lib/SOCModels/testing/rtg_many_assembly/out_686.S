.text

#The program finds the value of fibonacci 

Fibo:
		addi    x12 , x0 , 17 
		addi    x21 , x0 , 1 
		addi    x15 , x0 , 1 
		addi    x26 , x0 , 3 
		beq     x12 , x0 , Result0 
		beq     x12 , x15 , Result1 
Loop: 
		blt     x12 , x26 , Result 
		add     x28 , x21 , x15 
		addi    x21 , x15 , 0 
		addi    x15 , x28 , 0 
		addi    x26 , x26 , 1 
		jal     x0 , Loop 
Result0:
		addi    x28 , x0 , 0 
		addi    x6 , x0 , 0 
		bne     x28 , x6 , Fail 
Result1:
		addi    x28 , x0 , 1 
		addi    x14 , x0 , 1 
		bne     x28 , x14 , Fail 
Result:
		addi    x18 , x0 , 1597 
		bne     x28 , x18 , Result1 

Pass: 
		addi    x1 , x0 , 084 
		jal     x0 , End 
Fail: 
		addi    x1 , x0 , 070 
End: 
