.text

#The program finds the value of fibonacci 

Fibo:
		addi    x6 , x0 , 4 
		addi    x24 , x0 , 1 
		addi    x13 , x0 , 1 
		addi    x23 , x0 , 3 
		beq     x6 , x0 , Result0 
		beq     x6 , x13 , Result1 
Loop: 
		blt     x6 , x23 , Result 
		add     x20 , x24 , x13 
		addi    x24 , x13 , 0 
		addi    x13 , x20 , 0 
		addi    x23 , x23 , 1 
		jal     x0 , Loop 
Result0:
		addi    x20 , x0 , 0 
		addi    x29 , x0 , 0 
		bne     x20 , x29 , Fail 
Result1:
		addi    x20 , x0 , 1 
		addi    x26 , x0 , 1 
		bne     x20 , x26 , Fail 
Result:
		addi    x3 , x0 , 3 
		bne     x20 , x3 , Result1 

Pass: 
		addi    x1 , x0 , 084 
		jal     x0 , End 
Fail: 
		addi    x1 , x0 , 070 
End: 
