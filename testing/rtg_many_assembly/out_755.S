.text

#The program finds the value of fibonacci 

Fibo:
		addi    x29 , x0 , 5 
		addi    x28 , x0 , 1 
		addi    x9 , x0 , 1 
		addi    x21 , x0 , 3 
		beq     x29 , x0 , Result0 
		beq     x29 , x9 , Result1 
Loop: 
		blt     x29 , x21 , Result 
		add     x17 , x28 , x9 
		addi    x28 , x9 , 0 
		addi    x9 , x17 , 0 
		addi    x21 , x21 , 1 
		jal     x0 , Loop 
Result0:
		addi    x17 , x0 , 0 
		addi    x19 , x0 , 0 
		bne     x17 , x19 , Fail 
Result1:
		addi    x17 , x0 , 1 
		addi    x4 , x0 , 1 
		bne     x17 , x4 , Fail 
Result:
		addi    x30 , x0 , 5 
		bne     x17 , x30 , Result1 

Pass: 
		addi    x1 , x0 , 084 
		jal     x0 , End 
Fail: 
		addi    x1 , x0 , 070 
End: 
