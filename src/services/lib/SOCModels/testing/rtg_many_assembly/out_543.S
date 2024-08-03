.text

#The program finds the value of fibonacci 

Fibo:
		addi    x8 , x0 , 14 
		addi    x22 , x0 , 1 
		addi    x5 , x0 , 1 
		addi    x9 , x0 , 3 
		beq     x8 , x0 , Result0 
		beq     x8 , x5 , Result1 
Loop: 
		blt     x8 , x9 , Result 
		add     x24 , x22 , x5 
		addi    x22 , x5 , 0 
		addi    x5 , x24 , 0 
		addi    x9 , x9 , 1 
		jal     x0 , Loop 
Result0:
		addi    x24 , x0 , 0 
		addi    x13 , x0 , 0 
		bne     x24 , x13 , Fail 
Result1:
		addi    x24 , x0 , 1 
		addi    x28 , x0 , 1 
		bne     x24 , x28 , Fail 
Result:
		addi    x29 , x0 , 377 
		bne     x24 , x29 , Result1 

Pass: 
		addi    x1 , x0 , 084 
		jal     x0 , End 
Fail: 
		addi    x1 , x0 , 070 
End: 
