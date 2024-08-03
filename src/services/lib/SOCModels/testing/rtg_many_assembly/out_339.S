.text

#The program finds the value of fibonacci 

Fibo:
		addi    x16 , x0 , 17 
		addi    x24 , x0 , 1 
		addi    x1 , x0 , 1 
		addi    x10 , x0 , 3 
		beq     x16 , x0 , Result0 
		beq     x16 , x1 , Result1 
Loop: 
		blt     x16 , x10 , Result 
		add     x30 , x24 , x1 
		addi    x24 , x1 , 0 
		addi    x1 , x30 , 0 
		addi    x10 , x10 , 1 
		jal     x0 , Loop 
Result0:
		addi    x30 , x0 , 0 
		addi    x9 , x0 , 0 
		bne     x30 , x9 , Fail 
Result1:
		addi    x30 , x0 , 1 
		addi    x13 , x0 , 1 
		bne     x30 , x13 , Fail 
Result:
		addi    x25 , x0 , 1597 
		bne     x30 , x25 , Result1 

Pass: 
		addi    x1 , x0 , 084 
		jal     x0 , End 
Fail: 
		addi    x1 , x0 , 070 
End: 
