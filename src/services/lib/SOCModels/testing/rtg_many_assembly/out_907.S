.text

#The program finds the value of fibonacci 

Fibo:
		addi    x14 , x0 , 9 
		addi    x26 , x0 , 1 
		addi    x15 , x0 , 1 
		addi    x5 , x0 , 3 
		beq     x14 , x0 , Result0 
		beq     x14 , x15 , Result1 
Loop: 
		blt     x14 , x5 , Result 
		add     x8 , x26 , x15 
		addi    x26 , x15 , 0 
		addi    x15 , x8 , 0 
		addi    x5 , x5 , 1 
		jal     x0 , Loop 
Result0:
		addi    x8 , x0 , 0 
		addi    x23 , x0 , 0 
		bne     x8 , x23 , Fail 
Result1:
		addi    x8 , x0 , 1 
		addi    x20 , x0 , 1 
		bne     x8 , x20 , Fail 
Result:
		addi    x6 , x0 , 34 
		bne     x8 , x6 , Result1 

Pass: 
		addi    x1 , x0 , 084 
		jal     x0 , End 
Fail: 
		addi    x1 , x0 , 070 
End: 
