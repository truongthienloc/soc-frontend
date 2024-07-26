.text

#The program finds the value of fibonacci 

Fibo:
		addi    x19 , x0 , 7 
		addi    x10 , x0 , 1 
		addi    x17 , x0 , 1 
		addi    x30 , x0 , 3 
		beq     x19 , x0 , Result0 
		beq     x19 , x17 , Result1 
Loop: 
		blt     x19 , x30 , Result 
		add     x26 , x10 , x17 
		addi    x10 , x17 , 0 
		addi    x17 , x26 , 0 
		addi    x30 , x30 , 1 
		jal     x0 , Loop 
Result0:
		addi    x26 , x0 , 0 
		addi    x3 , x0 , 0 
		bne     x26 , x3 , Fail 
Result1:
		addi    x26 , x0 , 1 
		addi    x8 , x0 , 1 
		bne     x26 , x8 , Fail 
Result:
		addi    x28 , x0 , 13 
		bne     x26 , x28 , Result1 

Pass: 
		addi    x1 , x0 , 084 
		jal     x0 , End 
Fail: 
		addi    x1 , x0 , 070 
End: 
