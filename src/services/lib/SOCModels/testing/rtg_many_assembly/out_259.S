.text

#The program finds the value of fibonacci 

Fibo:
		addi    x25 , x0 , 17 
		addi    x13 , x0 , 1 
		addi    x10 , x0 , 1 
		addi    x30 , x0 , 3 
		beq     x25 , x0 , Result0 
		beq     x25 , x10 , Result1 
Loop: 
		blt     x25 , x30 , Result 
		add     x29 , x13 , x10 
		addi    x13 , x10 , 0 
		addi    x10 , x29 , 0 
		addi    x30 , x30 , 1 
		jal     x0 , Loop 
Result0:
		addi    x29 , x0 , 0 
		addi    x8 , x0 , 0 
		bne     x29 , x8 , Fail 
Result1:
		addi    x29 , x0 , 1 
		addi    x24 , x0 , 1 
		bne     x29 , x24 , Fail 
Result:
		addi    x23 , x0 , 1597 
		bne     x29 , x23 , Result1 

Pass: 
		addi    x1 , x0 , 084 
		jal     x0 , End 
Fail: 
		addi    x1 , x0 , 070 
End: 
