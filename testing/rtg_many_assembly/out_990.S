.text

#The program finds the value of fibonacci 

Fibo:
		addi    x25 , x0 , 14 
		addi    x20 , x0 , 1 
		addi    x2 , x0 , 1 
		addi    x3 , x0 , 3 
		beq     x25 , x0 , Result0 
		beq     x25 , x2 , Result1 
Loop: 
		blt     x25 , x3 , Result 
		add     x14 , x20 , x2 
		addi    x20 , x2 , 0 
		addi    x2 , x14 , 0 
		addi    x3 , x3 , 1 
		jal     x0 , Loop 
Result0:
		addi    x14 , x0 , 0 
		addi    x30 , x0 , 0 
		bne     x14 , x30 , Fail 
Result1:
		addi    x14 , x0 , 1 
		addi    x19 , x0 , 1 
		bne     x14 , x19 , Fail 
Result:
		addi    x28 , x0 , 377 
		bne     x14 , x28 , Result1 

Pass: 
		addi    x1 , x0 , 084 
		jal     x0 , End 
Fail: 
		addi    x1 , x0 , 070 
End: 
