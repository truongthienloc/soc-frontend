.text

#The program finds the value of fibonacci 

Fibo:
		addi    x30 , x0 , 15 
		addi    x20 , x0 , 1 
		addi    x18 , x0 , 1 
		addi    x31 , x0 , 3 
		beq     x30 , x0 , Result0 
		beq     x30 , x18 , Result1 
Loop: 
		blt     x30 , x31 , Result 
		add     x24 , x20 , x18 
		addi    x20 , x18 , 0 
		addi    x18 , x24 , 0 
		addi    x31 , x31 , 1 
		jal     x0 , Loop 
Result0:
		addi    x24 , x0 , 0 
		addi    x6 , x0 , 0 
		bne     x24 , x6 , Fail 
Result1:
		addi    x24 , x0 , 1 
		addi    x21 , x0 , 1 
		bne     x24 , x21 , Fail 
Result:
		addi    x17 , x0 , 610 
		bne     x24 , x17 , Result1 

Pass: 
		addi    x1 , x0 , 084 
		jal     x0 , End 
Fail: 
		addi    x1 , x0 , 070 
End: 
